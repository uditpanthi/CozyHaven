namespace CozyHaven.Models.DTOs
{
    public class HotelDTO
    {
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Description { get; set; }
        public int NumberOfRooms { get; set; }
        public double prePrice { get; set; }
        public double StartingPrice { get; set; }
        public ICollection<string> ImageURLs { get; set; }
    }
}
