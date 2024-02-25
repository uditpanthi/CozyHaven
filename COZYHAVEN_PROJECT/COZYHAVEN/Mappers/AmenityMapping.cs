using CozyHaven.Models;
using CozyHaven.Models.DTOs;

namespace CozyHaven.Mappers
{
    public class AmenityMapping
    {
        public Amenity _amenity;

        public AmenityMapping(AmenityDTO amenitydto)
        {
            _amenity = new Amenity
            {
                AmenityId = amenitydto.Id,
                Name = amenitydto.Name
            };
        }

        public Amenity GetAmenity()
        {

            return _amenity;
        }
    }
}
