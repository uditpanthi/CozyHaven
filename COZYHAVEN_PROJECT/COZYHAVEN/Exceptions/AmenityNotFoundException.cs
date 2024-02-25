using System.Runtime.Serialization;

namespace CozyHaven.Exceptions
{
    [Serializable]
    public class AmenityNotFoundException : Exception
    {
        public AmenityNotFoundException()
        {
        }

        public AmenityNotFoundException(string? message) : base(message)
        {
        }

        public AmenityNotFoundException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected AmenityNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}