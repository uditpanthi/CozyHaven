using CozyHaven.Contexts;
using CozyHaven.Interfaces;
using CozyHaven.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CozyHaven.Services
{
    public class HotelAmenityService : IHotelAmenityService
    {
        private readonly CozyHavenContext _context;

        public HotelAmenityService(CozyHavenContext context)
        {
            _context = context;
        }

        public async Task<List<HotelAmenity>> GetHotelAmenities(int hotelId)
        {
            return await _context.HotelAmenities
                                .Include(ha => ha.Amenity)
                                .Where(ha => ha.HotelId == hotelId)
                                .ToListAsync();
        }
    }
}
