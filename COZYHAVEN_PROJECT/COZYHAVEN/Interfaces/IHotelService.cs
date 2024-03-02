using CozyHaven.Models;
using CozyHaven.Models.DTOs;
using COZYHAVEN.Models.DTOs;

namespace CozyHaven.Interfaces
{
    public interface IHotelService
    {
        public Task<Hotel> GetHotel(int id);
        public Task<List<Hotel>> GetAllHotels();
        public Task<Hotel> AddHotel(HotelDTO hotel, int ownerId);
        public Task<Hotel> UpdateHotelDescription(int id, string description);
        public Task<Hotel> DeleteHotel(int id);
        //public Task<List<Hotel>> GetHotelsByDestinationId(int destinationId);
        public Task<Hotel> UpdateHotelOwner(int hotelid, int ownerId);
        public Task<List<Hotel>> GetHotelsByOwner(int ownerId);
        public Task<ICollection<Review>> GetHotelReviews(int hotelId);
        Task<List<HotelAmenityDTO>> GetHotelAmenities(int hotelId);
        public Task<ICollection<Room>> GetRoomsByHotelId(int hotelId);
        public Task<Hotel> UpdateHotelDetails(HotelDTO hotelDTO);
        public Task<Hotel> UpdateHotelDetails(Hotel hotel);
        public Task<ICollection<Reservation>> GetHotelReservations(int hotelId);
        Task<List<Hotel>> GetHotelsByLocation(string location);
        Task<List<Hotel>> GetHotelsByCriteria(string location, DateTime checkin, DateTime checkout, int capacity);


    }
}
