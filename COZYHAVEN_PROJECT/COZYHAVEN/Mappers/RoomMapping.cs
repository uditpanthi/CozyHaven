using CozyHaven.Models.DTOs;
using CozyHaven.Models;

namespace CozyHaven.Mappers
{
    public class RoomMapping
    {
        public static RoomDTO MapRoomToDTO(Room room)
        {
            return new RoomDTO
            {
                RoomId = room.RoomId,
                HotelId = room.HotelId,
                RoomSize = room.RoomSize,
                RoomType = room.RoomType,
                PricePerNight = room.PricePerNight,
                Capacity = room.Capacity,
                Available = true
            };
        }

        public static Room MapRoomDTOToEntity(RoomDTO roomDTO)
        {
            return new Room
            {
                RoomId=roomDTO.RoomId,
                HotelId = roomDTO.HotelId,
                RoomSize = roomDTO.RoomSize,
                RoomType = roomDTO.RoomType,
                PricePerNight = roomDTO.PricePerNight,
                Capacity = roomDTO.Capacity,
                Available = true
            };
        }
    }
}
