using CozyHaven.Models.DTOs;
using CozyHaven.Models;

namespace CozyHaven.Mappers
{
    public class ReservationMapping
    {
        public static ReservationDTO MapReservationToDTO(Reservation reservation)
        {
            return new ReservationDTO
            {
                UserId = reservation.UserId,
                RoomId = reservation.RoomId,
                CheckInDate = reservation.CheckInDate,
                CheckOutDate = reservation.CheckOutDate,
                Adults = reservation.Adults,
                Children = reservation.Children,
                TotalPrice = reservation.TotalPrice,
                Status = reservation.Status
            };
        }

        public static Reservation MapReservationDTOToEntity(ReservationDTO reservationDTO)
        {
            return new Reservation
            {
                UserId = reservationDTO.UserId,
                RoomId = reservationDTO.RoomId,
                CheckInDate = reservationDTO.CheckInDate,
                CheckOutDate = reservationDTO.CheckOutDate,
                Adults = reservationDTO.Adults,
                Children = reservationDTO.Children,
                TotalPrice = reservationDTO.TotalPrice,
                Status = BookingStatus.Pending
            };
        }
    }
}
