﻿using System.Runtime.Serialization;

namespace CozyHaven.Exceptions
{
    [Serializable]
    internal class PaymentNotFoundException : Exception
    {
        public PaymentNotFoundException()
        {
        }

        public PaymentNotFoundException(string? message) : base(message)
        {
        }

        public PaymentNotFoundException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected PaymentNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}