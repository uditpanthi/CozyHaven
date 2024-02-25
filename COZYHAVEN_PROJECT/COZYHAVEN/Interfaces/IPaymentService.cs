using CozyHaven.Models;
using CozyHaven.Models.DTOs;

namespace CozyHaven.Interfaces
{
    public interface IPaymentService
    {
        Task<Payment> AddPayment(PaymentDTO payment);
        Task<Payment> DeletePayment(int paymentId);
        Task<Payment> GetPayment(int paymentId);
        Task<List<Payment>> GetAllPayments();
        Task<Payment> UpdatePayment(Payment payment);
        //Task<List<Payment>> GetAllPaymentByUser(int UserId);
        //Task<List<Payment>> GetAllPaymentsByOwner(int ownerId);
    }
}
