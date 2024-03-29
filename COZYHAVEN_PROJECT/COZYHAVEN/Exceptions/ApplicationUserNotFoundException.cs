﻿using System.Runtime.Serialization;

namespace CozyHaven.Exceptions
{
    [Serializable]
    internal class ApplicationUserNotFoundException : Exception
    {
        public ApplicationUserNotFoundException()
        {
        }

        public ApplicationUserNotFoundException(string? message) : base(message)
        {
        }

        public ApplicationUserNotFoundException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected ApplicationUserNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}