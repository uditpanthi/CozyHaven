using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CozyHaven.Exceptions;
using CozyHaven.Interfaces;
using CozyHaven.Models;
using CozyHaven.Models.DTOs;
using CozyHaven.Services;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;

namespace COZYHAVENTEST
{
    [TestFixture]
    public class AmenityServiceTest
    {
        private Mock<IRepository<int, Amenity>> _mockRepository;
        private Mock<ILogger<AmenityService>> _mockLogger;
        private IAmenityService _amenityService;

        [SetUp]
        public void SetUp()
        {
            _mockRepository = new Mock<IRepository<int, Amenity>>();
            _mockLogger = new Mock<ILogger<AmenityService>>();
            _amenityService = new AmenityService(_mockRepository.Object, _mockLogger.Object);
        }

        [Test]
        public async Task AddAmenity_ValidAmenity_ReturnsAmenity()
        {
            // Arrange
            var amenityDto = new AmenityDTO
            {
                Name = "Pool"
            };
            var expectedAmenity = new Amenity
            {
                AmenityId = 1,
                Name = "Pool"
            };
            _mockRepository.Setup(repo => repo.Add(It.IsAny<Amenity>())).ReturnsAsync(expectedAmenity);

            // Act
            var result = await _amenityService.AddAmenity(amenityDto);

            // Assert
            Assert.That(result, Is.EqualTo(expectedAmenity));
        }

        [Test]
        public async Task DeleteAmenity_ExistingAmenityId_ReturnsDeletedAmenity()
        {
            // Arrange
            var amenityId = 1;
            var expectedAmenity = new Amenity
            {
                AmenityId = amenityId,
                Name = "Pool"
            };
            _mockRepository.Setup(repo => repo.Delete(amenityId)).ReturnsAsync(expectedAmenity);

            // Act
            var result = await _amenityService.DeleteAmenity(amenityId);

            // Assert
            Assert.That(result, Is.EqualTo(expectedAmenity));
        }

        [Test]
        public async Task GetAllAmenities_ReturnsListOfAmenities()
        {
            // Arrange
            var expectedAmenities = new List<Amenity>
            {
                new Amenity { AmenityId = 1, Name = "Pool" },
                new Amenity { AmenityId = 2, Name = "Gym" }
            };
            _mockRepository.Setup(repo => repo.GetAll()).ReturnsAsync(expectedAmenities);

            // Act
            var result = await _amenityService.GetAllAmenities();

            // Assert
            CollectionAssert.AreEqual(expectedAmenities, result);
        }

        [Test]
        public async Task GetAmenity_ExistingAmenityId_ReturnsAmenity()
        {
            // Arrange
            var amenityId = 1;
            var expectedAmenity = new Amenity
            {
                AmenityId = amenityId,
                Name = "Pool"
            };
            _mockRepository.Setup(repo => repo.GetById(amenityId)).ReturnsAsync(expectedAmenity);

            // Act
            var result = await _amenityService.GetAmenity(amenityId);

            // Assert
            Assert.That(result, Is.EqualTo(expectedAmenity));
        }

        [Test]
        public async Task UpdateAmenity_ExistingAmenityId_ReturnsUpdatedAmenityDTO()
        {
            // Arrange
            var amenityId = 1;
            var updatedName = "Spa";
            var existingAmenity = new Amenity
            {
                AmenityId = amenityId,
                Name = "Pool"
            };
            _mockRepository.Setup(repo => repo.GetById(amenityId)).ReturnsAsync(existingAmenity);
            _mockRepository.Setup(repo => repo.Update(It.IsAny<Amenity>())).ReturnsAsync(existingAmenity);

            // Act
            var result = await _amenityService.UpdateAmenity(amenityId, updatedName);

            // Assert
            Assert.That(result.Id, Is.EqualTo(amenityId));
            Assert.That(result.Name, Is.EqualTo(updatedName));
        }

        [Test]
        public void UpdateAmenity_NonExistingAmenityId_ThrowsAmenityNotFoundException()
        {
            // Arrange
            var amenityId = 1;
            _mockRepository.Setup(repo => repo.GetById(amenityId)).ReturnsAsync((Amenity)null!);

            // Act & Assert
            Assert.ThrowsAsync<AmenityNotFoundException>(() => _amenityService.UpdateAmenity(amenityId, "Spa"));
        }
    }
}
