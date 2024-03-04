using CozyHaven.Contexts;
using CozyHaven.Exceptions;
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
            await _context.SaveChangesAsync();
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
            else
            {
                throw new PaymentNotFoundException($"Payment with ID {key} not found.");
            }
        }

        public async Task<List<Payment>> GetAll()
        {
            return await Task.FromResult(_context.Payments.ToList());
        }

        public async Task<Payment> GetById(int key)
        {
            var payment = await Task.FromResult(_context.Payments.FirstOrDefault(b => b.PaymentId == key));
            if (payment == null)
            {
                throw new PaymentNotFoundException($"Payment with ID {key} not found.");
            }
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
            else
            {
                throw new PaymentNotFoundException($"Payment with ID {item.PaymentId} not found.");
            }
        }
    }
}
