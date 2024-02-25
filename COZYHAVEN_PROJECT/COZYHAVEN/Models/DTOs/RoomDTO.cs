namespace CozyHaven.Models.DTOs
{
    public class RoomDTO
    {
        public int RoomId { get; set; }
        public int HotelId { get; set; }
        public float RoomSize { get; set; }
        public string RoomType { get; set; }
        public float PricePerNight { get; set; }
        public int Capacity { get; set; }
        public bool Available { get; set; }
    }
}
