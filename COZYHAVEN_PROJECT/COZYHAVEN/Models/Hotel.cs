using Microsoft.AspNetCore.Mvc.ViewEngines;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CozyHaven.Models
{
    public class Hotel
    {
        [Key]
        public int HotelId { get; set; }
        public int OwnerId { get; set; }

        [Required]
        public string Name { get; set; }

        public string Address { get; set; }
        public string City { get; set; }

        public string Description { get; set; }
        [Required]
        public ICollection<string>? ImageURLs { get; set; }

        public int NumberOfRooms { get; set; }
        public double prePrice { get; set; }
        public double StartingPrice { get; set; }

        // Navigation properties
        public User? Owner { get; set; }
        public ICollection<Room>? Rooms { get; set; }
        public ICollection<Review>? Reviews { get; set; }
        public ICollection<HotelAmenity>? HotelAmenities { get; set; }

        public Hotel()
        {
            ImageURLs = new List<string>();
        }
    }
}
