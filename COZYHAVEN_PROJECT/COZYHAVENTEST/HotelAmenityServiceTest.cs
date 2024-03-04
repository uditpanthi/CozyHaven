using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CozyHaven.Contexts;
using CozyHaven.Interfaces;
using CozyHaven.Models;
using CozyHaven.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;

namespace COZYHAVENTEST
{
    [TestFixture]
    public class HotelAmenityServiceTest
    {
        private Mock<IHotelAmenityService> _mockHotelAmenityService;
        private CozyHavenContext _context;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<CozyHavenContext>()
                .UseInMemoryDatabase(databaseName: "CozyHaven_Test_Database")
                .Options;

            _context = new CozyHavenContext(options);
            _mockHotelAmenityService = new Mock<IHotelAmenityService>();
        }

        [Test]
        public async Task GetHotelAmenities_ValidHotelId_ReturnsListOfHotelAmenities()
        {
            // Arrange
            var hotelId = 1;
            var hotelAmenities = new List<HotelAmenity>
            {
                new HotelAmenity { HotelId = hotelId, Amenity = new Amenity { AmenityId = 1, Name = "Amenity1" } },
                new HotelAmenity { HotelId = hotelId, Amenity = new Amenity { AmenityId = 2, Name = "Amenity2" } }
            };

            _context.HotelAmenities.AddRange(hotelAmenities);
            await _context.SaveChangesAsync();

            var hotelAmenityService = new HotelAmenityService(_context);

            // Act
            var result = await hotelAmenityService.GetHotelAmenities(hotelId);

            // Assert
            Assert.IsNotNull(result);
            Assert.That(result.Count, Is.EqualTo(hotelAmenities.Count));
            Assert.IsTrue(hotelAmenities.All(ha => result.Any(r => r.Amenity.AmenityId == ha.Amenity.AmenityId)));
        }
    }
}
