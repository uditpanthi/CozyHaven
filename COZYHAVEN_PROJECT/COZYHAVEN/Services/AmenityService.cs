using CozyHaven.Exceptions;
using CozyHaven.Interfaces;
using CozyHaven.Mappers;
using CozyHaven.Models;
using CozyHaven.Models.DTOs;

namespace CozyHaven.Services
{
    public class AmenityService : IAmenityService
    {
        private readonly ILogger<AmenityService> _logger;
        IRepository<int,Amenity> _repository;
        public AmenityService(IRepository<int, Amenity> repository,ILogger<AmenityService> logger)
        {
            _repository = repository;
            _logger = logger;

        }
        public async Task<Amenity> AddAmenity(AmenityDTO amenitydto)
        {
            var amenity= new AmenityMapping(amenitydto).GetAmenity();
            var result= await _repository.Add(amenity);
            return result;
        }

        public async Task<Amenity> DeleteAmenity(int amenityId)
        {
            var result = await _repository.Delete(amenityId);
            return result;
        }

        public async Task<List<Amenity>> GetAllAmenities()
        {
            var amenities = await _repository.GetAll();
            return amenities;
        }


        public async Task<Amenity> GetAmenity(int amenityId)
        {
            var amenity = await _repository.GetById(amenityId);
            return amenity;
        }

        public async Task<AmenityDTO> UpdateAmenity(int amenityId, string name)
        {
            var amenity = await _repository.GetById(amenityId);
            if (amenity != null)
            {
                amenity.Name = name;
                amenity = await _repository.Update(amenity);
                return new AmenityDTO
                {
                    Id = amenityId,
                    Name = amenity.Name
                };
            }
            throw new AmenityNotFoundException();
        }
    }
}
