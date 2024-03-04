using CozyHaven.Exceptions;
using CozyHaven.Interfaces;
using CozyHaven.Models;
using CozyHaven.Models.DTOs;
using CozyHaven.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CozyHaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly IHotelService _hotelService;
        private readonly IHotelAmenityService _hotelAmenityService;

        public HotelController(IHotelService hotelService, IHotelAmenityService hotelAmenityService)
        {
            _hotelService = hotelService;
            _hotelAmenityService = hotelAmenityService;

        }

        [HttpGet("GetAllHotels")]
        public async Task<IActionResult> GetHotels()
        {
            try
            {
                var hotels = await _hotelService.GetAllHotels();
                return Ok(hotels);
            }
            catch (HotelNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var hotel = await _hotelService.GetHotel(id);
                return Ok(hotel);
            }
            catch (HotelNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //[HttpGet("GetByDestinationId")]
        //public async Task<IActionResult> GetByDestinationId(int id)
        //{
        //    try
        //    {
        //        var hotels = await _hotelService.GetHotelsByDestinationId(id);
        //        return Ok(hotels);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, ex.Message);
        //    }
        //}

        [HttpPost("AddHotel")]
        public async Task<IActionResult> AddHotel(HotelDTO hotel)
        {
            try
            {
                int ownerId = hotel.OwnerId;

                var addedHotel = await _hotelService.AddHotel(hotel, ownerId);
                return Ok(addedHotel);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("UpdateDescription")]
        public async Task<IActionResult> UpdateDescription(int id, string description)
        {
            try
            {
                var updatedHotel = await _hotelService.UpdateHotelDescription(id, description);
                return Ok(updatedHotel);
            }
            catch (HotelNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("DeleteHotel")]
        public async Task<IActionResult> DeleteHotel(int id)
        {
            try
            {
                var deletedHotel = await _hotelService.DeleteHotel(id);
                return Ok(deletedHotel);
            }
            catch (HotelNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("GetHotelsByOwner")]
        public async Task<IActionResult> GetHotelsByOwner(int ownerId)
        {
            try
            {
                var updatedHotel = await _hotelService.GetHotelsByOwner(ownerId);
                return Ok(updatedHotel);
            }
            catch (HotelNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("HotelReviews")]
        public async Task<IActionResult> GetHotelReviews(int id)
        {
            try
            {
                var reviews = await _hotelService.GetHotelReviews(id);
                return Ok(reviews);
            }
            catch (HotelNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("HotelAmenities")]
        public async Task<IActionResult> GetHotelAmenities(int id)
        {
            try
            {
                var amenities = await _hotelAmenityService.GetHotelAmenities(id);
                return Ok(amenities);
            }
            catch (HotelNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
        
        [HttpGet("GetRoomsByHotelId")]
        public async Task<ActionResult<ICollection<Room>>> GetRoomsByHotelId(int hotelId)
        {
            try
            {
                var rooms = await _hotelService.GetRoomsByHotelId(hotelId);
                return Ok(rooms);
            }
            catch (HotelNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpPut("UpdateHotelDetails")]
        public async Task<IActionResult> UpdateHotelDetails(HotelDTO hotelDTO)
        {
            try
            {
                var updatedHotel = await _hotelService.UpdateHotelDetails(hotelDTO);
                return Ok(updatedHotel);
            }
            catch (HotelNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpGet("GetHotelReservations")]
        public async Task<ActionResult<ICollection<Reservation>>> GetHotelReservations(int hotelId)
        {
            try
            {
                var Reservations = await _hotelService.GetHotelReservations(hotelId);
                return Ok(Reservations);
            }
            catch (HotelNotFoundException ex)
            {
                return NotFound(ex.Message);
            }    
        }
        [HttpGet("GetHotelsByLocation")]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetHotelsByLocation(string location)
        {
            try
            {
                var hotels = await _hotelService.GetHotelsByLocation(location);
                return Ok(hotels);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetHotelByLocationAndDate")]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetHotelByLocationAndDate(string location, DateTime checkin, DateTime checkout, int capacity)
        {
            try
            {
                var hotels = await _hotelService.GetHotelsByCriteria(location, checkin, checkout, capacity);
                return Ok(hotels);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
