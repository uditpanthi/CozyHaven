using CozyHaven.Interfaces;
using CozyHaven.Models;
using CozyHaven.Repository;
using CozyHaven.Models.DTOs;
using CozyHaven.Exceptions;

namespace CozyHaven.Services
{
    public class HotelService : IHotelService
    {
        private readonly IRepository<int, Hotel> _repository;
        private readonly ILogger<HotelService> _logger;
        private readonly IRoomService _roomService;
        private readonly IReservationService _reservationService;

        public HotelService(IRepository<int, Hotel> repository, ILogger<HotelService> logger, IRoomService roomRepo, IReservationService reservationRepo)
        {
            _repository = repository;
            _logger = logger;
            _roomService = roomRepo;
            _reservationService = reservationRepo;
        }

        public async Task<Hotel> AddHotel(HotelDTO hotel, int ownerId)
        {
            if (hotel.ImageURLs == null || !hotel.ImageURLs.Any())
            {
                throw new Exception("Image URLs are required when adding a hotel.");
            }

            // Set the OwnerId of the hotel
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
        public async Task<ICollection<Review>> GetHotelReviews(int hotelId)
        {
            _logger.LogInformation("Getting reviews for hotel with ID: {HotelId}", hotelId);
            var hotel = await GetHotel(hotelId);
            if (hotel != null)
            {
                return hotel.Reviews;
            }
            throw new HotelNotFoundException();
        }
        public async Task<ICollection<HotelAmenity>> GetHotelAmenities(int hotelId)
        {
            _logger.LogInformation("Getting amenities for hotel with ID: {HotelId}", hotelId);
            var hotel = await GetHotel(hotelId);
            if (hotel != null)
            {
                return hotel.HotelAmenities;
            }
            throw new HotelNotFoundException();
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
                existingHotel.Description = hotelDTO.Description;

                await _repository.Update(existingHotel);
                _logger.LogInformation("Hotel details updated successfully: {HotelId}", hotelDTO.Id);
                return existingHotel;
            }
            throw new HotelNotFoundException();
        }

        //public async Task<ICollection<Reservation>> GetHotelReservations(int hotelId)
        //{
        //    _logger.LogInformation("Getting reservations for hotel with ID: {HotelId}", hotelId);

        //    var hotel = await GetHotel(hotelId);

        //    if (hotel != null && hotel.Rooms != null)
        //    {
        //        var reservations = hotel.Rooms
        //            .Where(room => room.Reservations != null && room.Reservations.Any())
        //            .SelectMany(room => room.Reservations)
        //            .ToList();

        //        _logger.LogInformation("Found {Count} reservations for hotel with ID: {HotelId}", reservations.Count, hotelId);

        //        return reservations;
        //    }

        //    _logger.LogInformation("No reservations found for hotel with ID: {HotelId}", hotelId);

        //    throw new HotelNotFoundException();
        //}
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
            // Implement logic to fetch hotels based on location
            // Use the repository to query the database
            var hotels = await _repository.GetAll();
            return hotels.Where(h => h.City.ToLower() == location.ToLower()).ToList();
        }


        public async Task<List<Hotel>> GetHotelsByCriteria(string location, DateTime checkin, DateTime checkout, int capacity)
        {
            // Fetch hotels based on location
            var hotels = await GetHotelsByLocation(location);

            // Filter hotels based on criteria
            var availableHotels = new List<Hotel>();

            foreach (var hotel in hotels)
            {
                // Check if there are rooms available in the hotel with the desired capacity
                var availableRooms = hotel.Rooms.Where(room => room.Capacity >= capacity).ToList();

                // Check room availability for each available room
                foreach (var room in availableRooms)
                {
                    bool isRoomAvailable = await _reservationService.IsRoomAvailable(room.RoomId, checkin, checkout);

                    // If the room is available, add the hotel to the list of available hotels and break out of the loop
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
