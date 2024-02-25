using CozyHaven.Exceptions;
using CozyHaven.Interfaces;
using CozyHaven.Models;
using CozyHaven.Models.DTOs;
using CozyHaven.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CozyHaven.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AmenityController : ControllerBase
    {
        private readonly IAmenityService _amenityService;
        private readonly IHotelService _hotelService;


        public AmenityController(IAmenityService amenityService, IHotelService hotelService)
        {
            _amenityService = amenityService;
            _hotelService = hotelService;
        }

        [HttpPost("add")]
        public async Task<ActionResult<Amenity>> AddAmenity(AmenityDTO amenity)
        {
            var newAmenity = await _amenityService.AddAmenity(amenity);
            return CreatedAtAction(nameof(GetAmenity), new { id = newAmenity.AmenityId}, newAmenity);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Amenity>> DeleteAmenity(int id)
        {
            var deletedAmenity = await _amenityService.DeleteAmenity(id);
            if (deletedAmenity == null)
            {
                return NotFound();
            }
            return deletedAmenity;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Amenity>> GetAmenity(int id)
        {
            var amenity = await _amenityService.GetAmenity(id);
            if (amenity == null)
            {
                return NotFound();
            }
            return amenity;
        }

        [HttpGet("all")]
        public async Task<ActionResult<List<Amenity>>> GetAllAmenities()
        {
            var amenities = await _amenityService.GetAllAmenities();
            return amenities;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAmenity(int id, AmenityDTO updateAmenityDTO)
        {
            try
            {
                var updatedAmenity = await _amenityService.UpdateAmenity(id, updateAmenityDTO.Name);
                return Ok(updatedAmenity);
            }
            catch (AmenityNotFoundException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("add-amenity-to-hotel")]
        public async Task<IActionResult> AddAmenityToHotel(int hotelId, int amenityId)
        {
            try
            {
                var hotel = await _hotelService.GetHotel(hotelId);

                if (hotel == null)
                {
                    return NotFound("Hotel not found.");
                }

                var amenity = await _amenityService.GetAmenity(amenityId);

                if (amenity == null)
                {
                    return NotFound("Amenity not found.");
                }

                if (hotel.HotelAmenities.Any(ha => ha.AmenityId == amenityId))
                {
                    return Conflict("Amenity is already added to the hotel.");
                }

                hotel.HotelAmenities.Add(new HotelAmenity { HotelId = hotelId, AmenityId = amenityId });

                await _hotelService.UpdateHotelDetails(hotel);

                return Ok("Amenity added to hotel successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while adding the amenity to the hotel.");
            }
        }

    }
}
