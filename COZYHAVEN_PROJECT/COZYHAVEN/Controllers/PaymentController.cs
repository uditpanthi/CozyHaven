using CozyHaven.Interfaces;
using CozyHaven.Models;
using CozyHaven.Models.DTOs;
using CozyHaven.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CozyHaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentsService;
        private readonly ILogger<PaymentController> _logger;

        public PaymentController(
            IPaymentService paymentService,
            ILogger<PaymentController> logger)
        {
            _paymentsService = paymentService;
            _logger = logger;
        }

        // Admin Endpoints
        [HttpPost("admin")]
        public async Task<ActionResult<Payment>> AddPayment(PaymentDTO payment)
        {
            try
            {
                var result = await _paymentsService.AddPayment(payment);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while adding a payment.");
                return StatusCode(500, "An error occurred while adding the payment.");
            }
        }

        [HttpDelete("admin/{paymentId}")]
        public async Task<ActionResult<Payment>> DeletePayment(int paymentId)
        {
            try
            {
                var result = await _paymentsService.DeletePayment(paymentId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting the payment with ID: {paymentId}.");
                return StatusCode(500, "An error occurred while deleting the payment.");
            }
        }

        [HttpPut("admin")]
        public async Task<ActionResult<Payment>> UpdatePayment(Payment payment)
        {
            try
            {
                var result = await _paymentsService.UpdatePayment(payment);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating the payment with ID: {payment.PaymentId}.");
                return StatusCode(500, "An error occurred while updating the payment.");
            }
        }

        [HttpGet("admin/{paymentId}")]
        public async Task<ActionResult<Payment>> GetPayment(int paymentId)
        {
            try
            {
                var result = await _paymentsService.GetPayment(paymentId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving the payment with ID: {paymentId}.");
                return StatusCode(500, "An error occurred while retrieving the payment.");
            }
        }

        [HttpGet("admin")]
        public async Task<ActionResult<List<Payment>>> GetAllPayments()
        {
            try
            {
                var result = await _paymentsService.GetAllPayments();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving all payments.");
                return StatusCode(500, "An error occurred while retrieving all payments.");
            }
        }

        // Customer Endpoints
        [HttpGet("customer/{paymentId}")]
        public async Task<ActionResult<Payment>> GetPaymentForCustomer(int paymentId)
        {
            try
            {
                var result = await _paymentsService.GetPayment(paymentId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving the payment with ID: {paymentId}.");
                return StatusCode(500, "An error occurred while retrieving the payment.");
            }
        }

        // Owner Endpoints
        //[HttpGet("GetAllPaymentsByOwner")]
        //public async Task<ActionResult<List<Payment>>> GetAllPaymentsByOwner(int ownerId)
        //{
        //    try
        //    {
        //        var result = await _paymentsService.GetAllPaymentsByOwner(ownerId);
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, $"Error occurred while retrieving payments for owner with ID: {ownerId}.");
        //        return StatusCode(500, "An error occurred while retrieving payments for the owner.");
        //    }
        //}
        //[HttpGet("GetAllPaymentsByUser")]
        //public async Task<ActionResult<List<Payment>>> GetAllPaymentByUser(int userId)
        //{
        //    try
        //    {
        //        // Call the service method to get payments by user
        //        var payments = await _paymentsService.GetAllPaymentByUser(userId);
        //        return Ok(payments);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log and handle exceptions
        //        return StatusCode(500, $"An error occurred while retrieving payments for user with ID {userId}: {ex.Message}");
        //    }
        //}
    }
}