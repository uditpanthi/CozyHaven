using CozyHaven.Interfaces;
using CozyHaven.Models;
using CozyHaven.Models.DTOs;

namespace CozyHaven.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IRepository<int, Payment> _repo;
        private readonly ILogger<PaymentService> _logger;
        private readonly IUserService _userService;

        public PaymentService(IRepository<int, Payment> repo, ILogger<PaymentService> logger, IUserService userService)
        {
            _repo = repo;
            _logger = logger;
            _userService = userService;
        }
        public async Task<Payment> AddPayment(PaymentDTO paymentDto)
        {
            var payment = PaymentMapping.MapToPayment(paymentDto);

            try
            {
                payment = await _repo.Add(payment);
                _logger.LogInformation("Payment added successfully.");
                return payment;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while adding payment.");
                throw;
            }
        }

        public async Task<Payment> DeletePayment(int paymentId)
        {
            var payment = await _repo.Delete(paymentId);
            return payment;
        }

        public async Task<Payment> GetPayment(int paymentId)
        {
            var payment = await _repo.GetById(paymentId);
            return payment;
        }

        public async Task<List<Payment>> GetAllPayments()
        {
            var payments = await _repo.GetAll();
            return payments;
        }

        public async Task<Payment> UpdatePayment(Payment payment)
        {
            payment = await _repo.Update(payment);
            return payment;
        }

        //public async Task<List<Payment>> GetAllPaymentsByOwner(int userId)
        //{
        //    // Retrieve the user by userId
        //    var user = await _userService.GetUser(userId);
        //    if (user == null)
        //    {
        //        throw new Exception("User not found");
        //    }

        //    // Retrieve all payments from the repository
        //    var payments = await _repo.GetAll();

        //    // Filter payments based on the specified userType
        //    var filteredPayments = payments
        //        .Where(p => p.Reservation != null && p.Reservation.User != null && p.Reservation.User.UserType == UserType.HotelOwner)
        //        .ToList();

        //    return filteredPayments;
        //}



        //public async Task<List<Payment>> GetAllPaymentByUser(int userId)
        //{
        //    // Retrieve all payments from the repository
        //    var payments = await _repo.GetAll();

        //    // Filter payments based on the provided userId
        //    var paymentsByUser = payments
        //        .Where(p => p.Reservation != null && p.Reservation.User != null && p.Reservation.User.UserID == userId)
        //        .ToList();

        //    return paymentsByUser;
        //}

    }
}
