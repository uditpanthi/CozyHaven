using CozyHaven.Exceptions;
using CozyHaven.Interfaces;
using CozyHaven.Models;
using CozyHaven.Models.DTOs;
using CozyHaven.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CozyHaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomservice;

        public RoomController(IRoomService roomService)
        {
            _roomservice=roomService;
        }
        [HttpGet("GetAllRooms")]
        public async Task<ActionResult<List<Room>>> GetRooms()
        {
            try
            {
                var rooms = await _roomservice.GetAllRooms();
                return Ok(rooms);
            }
            catch (RoomNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpGet("GetById")]
        public async Task<ActionResult<Room>> GetRoom(int id)
        {
            try
            {
                var room = await _roomservice.GetRoom(id);
                return Ok(room);
            }
            catch (RoomNotFoundException ex)
            {
                return NotFound(ex.Message);
            }

        }
        //[Authorize(Roles = "Admin")]
        [HttpPost("AddRoom")]
        public async Task<ActionResult<Room>> AddRoom(RoomDTO room)
        {
            try
            {
                var newroom=await _roomservice.AddRoom(room);
                return Ok(newroom);
               
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }
        [HttpPut("UpdatePrice")]
        public async Task<ActionResult<Room>> UpdatePrice(int id,int price)
        {
            try
            {
                var updatedRoom = await _roomservice.UpdateRoomPrice(id, price);
                return Ok(updatedRoom);
            }
            catch (RoomNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpDelete("DeleteRoom")]
        public async Task<ActionResult<Room>> DeleteRoom(int id)
        {
            try
            {
                var room = await _roomservice.DeleteRoom(id);
                return Ok(room);
            }
            catch (RoomNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        //[Authorize(Roles = "Admin,Owner")]
        [HttpPut("UpdateDetails")]
        public async Task<ActionResult<Room>> UpdateRoomDetails(RoomDTO roomDTO)
        {
            try
            {
                var updatedRoom = await _roomservice.UpdateRoomDetails(roomDTO);
                return Ok(updatedRoom);
            }
            catch (RoomNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        [HttpGet("AvailableRooms")]
        public async Task<ActionResult<List<Room>>> GetAvailableRooms()
        {
            try
            {
                var availableRooms = await _roomservice.GetAvailableRooms();
                return Ok(availableRooms);
            }
            catch (RoomNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
