using CozyHaven.Contexts;
using CozyHaven.Exceptions;
using CozyHaven.Interfaces;
using CozyHaven.Models;
using Microsoft.EntityFrameworkCore;

namespace CozyHaven.Repository
{
    public class ReservationRepository : IRepository<int, Reservation>
    {
        private readonly CozyHavenContext _context;
        private readonly ILogger<ReservationRepository> _logger;

        public ReservationRepository(CozyHavenContext context, ILogger<ReservationRepository> logger)
        {
            _context=context;
            _logger = logger;
        }
        public async Task<Reservation> Add(Reservation item)
        {
            _context.Reservations.Add(item);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Booking added: {BookingId}", item.ReservationId);
            return item;
            
        }

        public async Task<Reservation> Delete(int key)
        {
            var booking = await GetById(key);
            if (booking != null)
            {
                _context.Reservations.Remove(booking);
                _context.SaveChanges();
                _logger.LogInformation("Booking deleted: {BookingId}", key);
                return booking;
            }
            else
            {
                throw new ReservationNotFoundException($"Reservation with ID {key} not found.");
            }
        }

        public async Task<List<Reservation>> GetAll()
        {
            var bookings = _context.Reservations
                .Include(b => b.Room)
                .ToList();
            _logger.LogInformation("Retrieved all bookings.");
            return await Task.FromResult(bookings);
        }

        public async Task<Reservation> GetById(int key)
        {
            var booking = await _context.Reservations
                .Include(b => b.Room)
                .FirstOrDefaultAsync(b => b.ReservationId == key);
            if (booking != null)
            {
                _logger.LogInformation("Retrieved booking: {BookingId}", key);
                return booking;
            }
            else
            {
                throw new ReservationNotFoundException($"Reservation with ID {key} not found.");
            }
        }


        public async Task<Reservation> Update(Reservation item)
        {
            var booking = await GetById(item.ReservationId);
            if (booking != null)
            {
                _context.Entry<Reservation>(item).State = EntityState.Modified;
                _context.SaveChanges();
                _logger.LogInformation("Booking updated: {BookingId}", item.ReservationId);
                return item;
            }
            else
            {
                throw new ReservationNotFoundException($"Reservation with ID {item.ReservationId} not found.");
            }
        }
    }
}
