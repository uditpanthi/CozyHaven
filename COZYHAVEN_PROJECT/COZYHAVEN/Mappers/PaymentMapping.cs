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
            ReservationId = paymentDTO.ReservationID,
            Status= paymentDTO.PaymentStatus, // Cast enum
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
            ReservationID = payment.ReservationId,
            PaymentStatus = PaymentStatus.Pending, // Cast enum
            PaymentMethod= payment.PaymentMethod,
            PaymentDate = payment.PaymentDate
        };
    }
}