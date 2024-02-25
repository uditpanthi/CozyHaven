using CozyHaven.Exceptions;
using CozyHaven.Interfaces;
using CozyHaven.Models;
using CozyHaven.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace CozyHaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService _reservationservice;

        public ReservationController(IReservationService ReservationService) {
            _reservationservice=ReservationService;
        }
        [HttpGet("AllReservations")]
        public async Task<ActionResult<List<Reservation>>> GetReservations()
        {
            try
            {
                return await _reservationservice.GetAllReservations();
            }
            catch (ReservationNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }
        [HttpGet("GetById")]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
        {
            try
            {
                return await _reservationservice.GetReservation(id);
            }
            catch (RoomNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }
        //[HttpPost("AddReservation")]
        //public async Task<ActionResult<Reservation>> AddReservation(ReservationDTO Reservation)
        //{
        //    try
        //    {
        //        return await _Reservationservice.AddReservation(Reservation);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
        //    }
        //}
        [HttpPut("UpdateReservationStatus")]
        public async Task<ActionResult<Reservation>> UpdateReservation(int id,BookingStatus status)
        {
            try
            {
                return await _reservationservice.UpdateReservationStatus(id, status);
            }
            catch (RoomNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }
        [HttpDelete("DeleteReservation")]
        public async Task<ActionResult<Reservation>> DeleteReservation(int id){
            try
            {
                return await _reservationservice.DeleteReservation(id);
            }
            catch (RoomNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }
        [HttpGet("HotelReservations")]
        public async Task<IActionResult> GetHotelReservations(int hotelId)
        {
            try
            {
                var Reservations = await _reservationservice.GetHotelReservations(hotelId);
                return Ok(Reservations);

            }
            catch (RoomNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
        [HttpGet("CheckAvailability")]
        public async Task<ActionResult<bool>> CheckRoomAvailability(int roomId, DateTime checkInDate, DateTime checkOutDate)
        {
            bool isRoomAvailable = await _reservationservice.IsRoomAvailable(roomId, checkInDate, checkOutDate);
            return Ok(isRoomAvailable);
        }

        [HttpPost("AddReservation")]
        public async Task<ActionResult<Reservation>> AddReservation(ReservationDTO Reservation, string username)
        {
            try
            {
                var addedReservation = await _reservationservice.AddReservation(Reservation, username);
                return CreatedAtAction(nameof(GetReservation), new { id = addedReservation.ReservationId }, addedReservation);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
