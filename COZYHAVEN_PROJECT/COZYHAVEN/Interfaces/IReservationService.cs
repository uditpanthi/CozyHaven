using CozyHaven.Models;
using CozyHaven.Models.DTOs;

namespace CozyHaven.Interfaces
{
    public interface IReservationService
    {
        public Task<Reservation> GetReservation(int id);
        public Task<List<Reservation>> GetAllReservations();
        public Task<Reservation> AddReservation(ReservationDTO Reservation,string username);
        public Task<Reservation> UpdateReservationStatus(int id,BookingStatus status);
        public Task<Reservation> DeleteReservation(int id);
        //public Task<List<Reservation>> GetReservationsByUserId(int userid);
        public Task<List<Reservation>> GetReservationsByRoomId(int roomid);
        public Task<int> GetReservationsCount();
        //public Task<int> AvailableRoomsCount();
        public Task<List<Reservation>> GetHotelReservations(int hotelId);
        public Task<bool> IsRoomAvailable(int roomId, DateTime checkInDate, DateTime checkOutDate);
    }
}
