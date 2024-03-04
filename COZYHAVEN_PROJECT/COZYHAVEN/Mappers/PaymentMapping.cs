using CozyHaven.Models.DTOs;
using CozyHaven.Models;

public static class PaymentMapping
{
    public static Payment MapToPayment(PaymentDTO paymentDTO)
    {
        if (paymentDTO == null)
            return null;

        return new Payment
        {
            PaymentId = paymentDTO.PaymentID,
            Amount=paymentDTO.Amount,
            ReservationId = paymentDTO.ReservationID,
            Status= paymentDTO.PaymentStatus, 
            PaymentMethod = paymentDTO.PaymentMethod,
            PaymentDate = paymentDTO.PaymentDate
        };
    }

    public static PaymentDTO MapToPaymentDTO(Payment payment)
    {
        if (payment == null)
            return null;

        return new PaymentDTO
        {
            PaymentID = payment.PaymentId,
            Amount = payment.Amount,
            ReservationID = payment.ReservationId,
            PaymentStatus = PaymentStatus.Pending,
            PaymentMethod= payment.PaymentMethod,
            PaymentDate = payment.PaymentDate
        };
    }
}