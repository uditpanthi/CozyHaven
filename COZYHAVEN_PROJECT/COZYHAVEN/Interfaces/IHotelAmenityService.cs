using CozyHaven.Models;
using COZYHAVEN.Models.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CozyHaven.Interfaces
{
    public interface IHotelAmenityService
    {
        public Task<List<HotelAmenity>> GetHotelAmenities(int hotelId);
    }
}
