using CozyHaven.Contexts;
using CozyHaven.Interfaces;
using CozyHaven.Models;
using Microsoft.EntityFrameworkCore;

namespace CozyHaven.Repository
{
    public class PaymentRepository:IRepository<int,Payment>
    {
        private readonly CozyHavenContext _context;

        public PaymentRepository(CozyHavenContext context)
        {
            _context = context;
        }
        public async Task<Payment> Add(Payment item)
        {
            _context.Payments.Add(item);
            _context.SaveChanges();
            return item;

        }

        public async Task<Payment> Delete(int key)
        {
            var payment = await GetById(key);
            if (payment != null)
            {
                _context.Payments.Remove(payment);
                _context.SaveChanges();
                return payment;
            }
            return null;
        }

        public async Task<List<Payment>> GetAll()
        {
            return _context.Payments.ToList();
        }

        public async Task<Payment> GetById(int key)
        {
            var payment = _context.Payments.FirstOrDefault(b => b.PaymentId == key);
            return payment;
        }

        public async Task<Payment> Update(Payment item)
        {
            var payment = await GetById(item.PaymentId);
            if (payment != null)
            {
                _context.Entry(payment).CurrentValues.SetValues(item);
                _context.SaveChanges();
                return item;
            }
            return null;
        }
    }
}
