using CozyHaven.Interfaces;
using CozyHaven.Models;
using CozyHaven.Repository;
using CozyHaven.Models.DTOs;
using CozyHaven.Exceptions;
using COZYHAVEN.Models.DTOs;

namespace CozyHaven.Services
{
    public class HotelService : IHotelService
    {
        private readonly IRepository<int, Hotel> _repository;
        private readonly ILogger<HotelService> _logger;
        private readonly IRoomService _roomService;
        private readonly IReservationService _reservationService;
        private readonly IHotelAmenityService _hotelAmenityService;

        public HotelService(IRepository<int, Hotel> repository, ILogger<HotelService> logger, IRoomService roomRepo, IReservationService reservationRepo, IHotelAmenityService hotelAmenityService)
        {
            _repository = repository;
            _logger = logger;
            _roomService = roomRepo;
            _reservationService = reservationRepo;
            _hotelAmenityService = hotelAmenityService;
        }

        public async Task<Hotel> AddHotel(HotelDTO hotel, int ownerId)
        {
            if (hotel.ImageURLs == null || !hotel.ImageURLs.Any())
            {
                throw new Exception("Image URLs are required when adding a hotel.");
            }

            hotel.OwnerId = ownerId;

            Hotel newhotel = HotelMapping.MapDTOToHotel(hotel);
            newhotel = await _repository.Add(newhotel);
            return newhotel;
        }

        public async Task<Hotel> DeleteHotel(int id)
        {
            var hotel = await GetHotel(id);
            if (hotel != null)
            {
                return await _repository.Delete(id);
            }
            throw new HotelNotFoundException();

        }

        public async Task<List<Hotel>> GetAllHotels()
        {
            var hotels = await _repository.GetAll();
            if (hotels != null) { return hotels; }
            throw new HotelNotFoundException();
        }

        public async Task<Hotel> GetHotel(int id)
        {
            var hotel = await _repository.GetById(id);
            if (hotel != null) { return hotel; }
            throw new HotelNotFoundException();
        }


        //public async Task<List<Hotel>> GetHotelsByDestinationId(int destinationId)
        //{
        //    var hotels=await GetAllHotels();
        //    if (hotels == null) { throw new NoHotelFoundException(); }
        //    List<Hotel> hotels1 = new List<Hotel>();
        //    foreach(var hotel in hotels)
        //    {
        //        if (hotel.DestinationId == destinationId) { hotels1.Add(hotel); }
        //    }
        //    return hotels1;
        //}

        public async Task<Hotel> UpdateHotelDescription(int id, string description)
        {
            var hotel = await GetHotel(id);
            if (hotel != null)
            {
                hotel.Description = description;
                return await _repository.Update(hotel);
            }
            throw new HotelNotFoundException();
        }
        public async Task<Hotel> UpdateHotelOwner(int id, int ownerId)
        {
            _logger.LogInformation("Updating owner for hotel with ID: {HotelId}", id);
            var hotel = await GetHotel(id);
            if (hotel != null)
            {
                hotel.OwnerId = ownerId;
                await _repository.Update(hotel);
                return hotel;
            }
            throw new HotelNotFoundException();
        }
        public async Task<List<Hotel>> GetHotelsByOwner(int ownerId)
        {
            _logger.LogInformation("Fetching hotels for owner with ID: {OwnerId}", ownerId);

            try
            {
                var allHotels = await _repository.GetAll();

                var hotelsForOwner = allHotels.Where(h => h.OwnerId == ownerId).ToList();

                return hotelsForOwner;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching hotels for owner with ID: {OwnerId}", ownerId);
                throw;
            }
        }
        public async Task<ICollection<Review>> GetHotelReviews(int hotelId)
        {
            _logger.LogInformation("Getting reviews for hotel with ID: {HotelId}", hotelId);
            var hotel = await GetHotel(hotelId);
            if (hotel != null)
            {
                return hotel.Reviews ?? new List<Review>();
            }
            throw new HotelNotFoundException();
        }

        public async Task<List<HotelAmenityDTO>> GetHotelAmenities(int hotelId)
        {
            var hotel = await _repository.GetById(hotelId);
            if (hotel != null)
            {
                if (hotel.HotelAmenities != null)
                {
                    var amenityDTOs = hotel.HotelAmenities
                        .Select(ha => new HotelAmenityDTO
                        {
                            AmenityId = ha.AmenityId,
                            AmenityName = ha.Amenity?.Name
                                                          
                        })
                        .ToList();

                    return amenityDTOs;
                }
            }
            return new List<HotelAmenityDTO>(); 
        }


        public async Task<ICollection<Room>> GetRoomsByHotelId(int hotelId)
        {
            _logger.LogInformation("Getting rooms for hotel with ID: {HotelId}", hotelId);
            var hotel = await GetHotel(hotelId);
            if (hotel != null)
            {
                return hotel.Rooms;
            }
            throw new HotelNotFoundException();
        }
        public async Task<Hotel> UpdateHotelDetails(HotelDTO hotelDTO)
        {
            _logger.LogInformation("Updating details for hotel with ID: {HotelId}");
            var existingHotel = await GetHotel(hotelDTO.Id);
            if (existingHotel != null)
            {
                existingHotel.Name = hotelDTO.Name;
                existingHotel.Address = hotelDTO.Address;
                existingHotel.City= hotelDTO.City;
                existingHotel.Description = hotelDTO.Description;
                existingHotel.NumberOfRooms= hotelDTO.NumberOfRooms;
                existingHotel.prePrice = hotelDTO.prePrice;
                existingHotel.StartingPrice = hotelDTO.StartingPrice;
                existingHotel.ImageURLs=existingHotel.ImageURLs;
           

                await _repository.Update(existingHotel);
                _logger.LogInformation("Hotel details updated successfully: {HotelId}", hotelDTO.Id);
                return existingHotel;
            }
            throw new HotelNotFoundException();
        }

        public async Task<ICollection<Reservation>> GetHotelReservations(int hotelId)
        {
            var rooms = await _roomService.GetAllRooms();
            var reservations = await _reservationService.GetAllReservations();
            ICollection<Reservation> hotelReservations = (from reservation in reservations
                                                          join room in rooms on reservation.RoomId equals room.RoomId
                                                          where room.HotelId == hotelId
                                                          select reservation).ToList();
            if (hotelReservations != null || hotelReservations.Count > 0)
                return hotelReservations;
            throw new ReservationNotFoundException();
        }

        public async Task<Hotel> UpdateHotelDetails(Hotel hotel)
        {
            _logger.LogInformation("Updating details for hotel with ID: {HotelId}", hotel.HotelId);
            var existingHotel = await GetHotel(hotel.HotelId);
            if (existingHotel != null)
            {
                existingHotel.Name = hotel.Name;
                existingHotel.Address = hotel.Address;
                existingHotel.Description = hotel.Description;

                await _repository.Update(existingHotel);
                _logger.LogInformation("Hotel details updated successfully: {HotelId}", hotel.HotelId);
                return existingHotel;
            }
            throw new HotelNotFoundException();
        }
        public async Task<List<Hotel>> GetHotelsByLocation(string location)
        {
            var hotels = await _repository.GetAll();
            return hotels.Where(h => h.City.ToLower() == location.ToLower()).ToList();
        }


        public async Task<List<Hotel>> GetHotelsByCriteria(string location, DateTime checkin, DateTime checkout, int capacity)
        {
            var hotels = await GetHotelsByLocation(location);
            var availableHotels = new List<Hotel>();

            foreach (var hotel in hotels)
            {
                var availableRooms = hotel.Rooms.Where(room => room.Capacity >= capacity).ToList();
                foreach (var room in availableRooms)
                {
                    bool isRoomAvailable = await _reservationService.IsRoomAvailable(room.RoomId, checkin, checkout);
                    if (isRoomAvailable)
                    {
                        availableHotels.Add(hotel);
                        break;
                    }
                }
            }

            return availableHotels;
        }

        

        //public async Task<List<Hotel>> GetHotelsByCriteria(string location, DateTime checkin, DateTime checkout, int capacity)
        //{
        //    // Fetch hotels based on location
        //    var hotels = await GetHotelsByLocation(location);

        //    // Filter hotels based on criteria
        //    var availableHotels = hotels.Where(hotel =>
        //        hotel.Rooms.Any(room =>
        //            room.Capacity >= capacity 
        //        )
        //    ).ToList();

        //    return availableHotels;
        //}

    }
}
