using CozyHaven.Contexts;
using CozyHaven.Interfaces;
using CozyHaven.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CozyHaven.Repository
{
    public class HotelRepository : IRepository<int, Hotel>
    {
        private readonly CozyHavenContext _context;
        private readonly ILogger<HotelRepository> _logger;

        public HotelRepository(CozyHavenContext context, ILogger<HotelRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Hotel> Add(Hotel item)
        {
            try
            {
                _context.Hotels.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while adding hotel.");
                throw; 
            }
        }

        public async Task<Hotel> Delete(int key)
        {
            var hotel = await GetById(key);
            if (hotel != null)
            {
                _context.Hotels.Remove(hotel);
                _context.SaveChanges();
                return hotel;
            }
            else
            {
                throw new HotelNotFoundException($"Hotel with ID {key} not found.");
            }
        }


        public async Task<List<Hotel>> GetAll()
        {
            return await Task.FromResult(_context.Hotels
                .Include(h => h.Rooms)
                .Include(h => h.Reviews)
                .Include(h => h.HotelAmenities)
                .ToList());
        }

        public async Task<Hotel> GetById(int key)
        {
            var hotel = await Task.FromResult(_context.Hotels
                .Include(h => h.Rooms)
                .Include(h => h.Reviews)
                .Include(h => h.HotelAmenities)
                .FirstOrDefault(h => h.HotelId == key));

            if (hotel != null)
            {
                return hotel;
            }
            throw new HotelNotFoundException($"Hotel with ID {key} not found.");
        }

        public async Task<Hotel> Update(Hotel item)
        {
            var hotel = await GetById(item.HotelId);

            if (hotel != null)
            {
                _context.Entry<Hotel>(item).State = EntityState.Modified;
                _context.SaveChanges();
                return item;
            }
            throw new HotelNotFoundException($"Hotel with ID {item.HotelId} not found for update.");
        }

    }
}
