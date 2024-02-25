using System.ComponentModel.DataAnnotations;

namespace CozyHaven.Models
{
    public class Amenity
    {
        [Key]
        public int AmenityId { get; set; }

        [Required]
        public string Name { get; set; }
        //navigation properties
        public ICollection<HotelAmenity>? HotelAmenity { get; set; } 

    }
}
