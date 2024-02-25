using CozyHaven.Models;
using CozyHaven.Models.DTOs;

namespace CozyHaven.Interfaces
{
    public interface IAmenityService
    {
        Task<Amenity> AddAmenity(AmenityDTO amenity);
        Task<Amenity> DeleteAmenity(int amenityId);
        Task<Amenity> GetAmenity(int amenityId);
        Task<List<Amenity>> GetAllAmenities();
        Task<AmenityDTO> UpdateAmenity(int amenityId, string Name);
    }
}
