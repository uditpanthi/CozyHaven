using CozyHaven.Interfaces;
using CozyHaven.Models.DTOs;
using CozyHaven.Models;
using CozyHaven.Services;
using CozyHaven.Repository;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace COZYHAVENTEST
{
    [TestFixture]
    public class HotelServiceTest
    {
        private Mock<IRepository<int, Hotel>> _mockRepository;
        private Mock<ILogger<HotelService>> _mockLogger;
        private Mock<IRoomService> _mockRoomRepo;
        private Mock<IReservationService> _mockReservationRepo;
        private Mock<IHotelAmenityService> _mockHotelAmenityRepo;
        private IHotelService _hotelService;

        [SetUp]
        public void Setup()
        {
            _mockRepository = new Mock<IRepository<int, Hotel>>();
            _mockLogger = new Mock<ILogger<HotelService>>();
            _mockRoomRepo = new Mock<IRoomService>();
            _mockReservationRepo = new Mock<IReservationService>();
            _mockHotelAmenityRepo = new Mock<IHotelAmenityService>();
            _hotelService = new HotelService(_mockRepository.Object, _mockLogger.Object, _mockRoomRepo.Object, _mockReservationRepo.Object,_mockHotelAmenityRepo.Object);
        }

        [Test]
        public async Task AddHotel_ValidHotelDTO_ReturnsAddedHotel()
        {
            // Arrange
            var hotelDTO = new HotelDTO { ImageURLs = new List<string> { "url1", "url2" } }; 
            var ownerId = 1;
            var addedHotel = new Hotel(); 
            _mockRepository.Setup(repo => repo.Add(It.IsAny<Hotel>())).ReturnsAsync(addedHotel); 

            // Act
            var result = await _hotelService.AddHotel(hotelDTO, ownerId);

            // Assert
            Assert.IsNotNull(result); 
        }


        [Test]
        public async Task DeleteHotel_ExistingHotelId_ReturnsDeletedHotel()
        {
            // Arrange
            var hotelId = 1; 
            var hotelToDelete = new Hotel(); 
            _mockRepository.Setup(repo => repo.Delete(hotelId)).ReturnsAsync(hotelToDelete); 

            // Act & Assert
            HotelNotFoundException? exception = null;

            try
            {
                await _hotelService.DeleteHotel(hotelId);
            }
            catch (HotelNotFoundException ex)
            {
                exception = ex;
            }

            // Assert
            Assert.IsNotNull(exception);
        }


        [Test]
        public async Task GetAllHotels_ReturnsListOfHotels()
        {
            // Arrange
            var hotels = new List<Hotel>();
            _mockRepository.Setup(repo => repo.GetAll()).ReturnsAsync(hotels);

            // Act
            var result = await _hotelService.GetAllHotels();

            // Assert
            Assert.That(result, Is.EqualTo(hotels));
        }

        [Test]
        public async Task GetHotel_ExistingHotelId_ReturnsHotel()
        {
            // Arrange
            var hotelId = 1;
            var hotel = new Hotel { };
            _mockRepository.Setup(repo => repo.GetById(hotelId)).ReturnsAsync(hotel);

            // Act
            var result = await _hotelService.GetHotel(hotelId);

            // Assert
            Assert.That(result, Is.EqualTo(hotel));
        }

        [Test]
        public async Task UpdateHotelDescription_ExistingHotelId_ReturnsUpdatedHotel()
        {
            // Arrange
            var hotelId = 1; 
            var updatedHotel = new Hotel { HotelId = hotelId }; 
            _mockRepository.Setup(repo => repo.GetById(hotelId)).ReturnsAsync(updatedHotel); 
            _mockRepository.Setup(repo => repo.Update(updatedHotel)).ReturnsAsync(updatedHotel); 

            // Act
            var result = await _hotelService.UpdateHotelDescription(hotelId, "New Description");

            // Assert
            Assert.IsNotNull(result); 
        }


        [Test]
        public async Task UpdateHotelOwner_ExistingHotelId_ReturnsUpdatedHotel()
        {
            // Arrange
            var hotelId = 1; 
            var ownerId = 2; 
            var updatedHotel = new Hotel { }; 
            _mockRepository.Setup(repo => repo.GetById(hotelId)).ReturnsAsync(updatedHotel);

            // Act
            var result = await _hotelService.UpdateHotelOwner(hotelId, ownerId);

            // Assert
            Assert.That(result, Is.EqualTo(updatedHotel)); 
        }

        [Test]
        public async Task GetHotelReviews_ExistingHotelId_ReturnsHotelReviews()
        {
            // Arrange
            var hotelId = 1; 
            var hotel = new Hotel { Reviews = new List<Review>() }; 
            _mockRepository.Setup(repo => repo.GetById(hotelId)).ReturnsAsync(hotel);

            // Act
            var result = await _hotelService.GetHotelReviews(hotelId);

            // Assert
            Assert.That(result, Is.EqualTo(hotel.Reviews)); 
        }


        [Test]
        public async Task GetHotelAmenities_ExistingHotelId_ReturnsHotelAmenities()
        {
            // Arrange
            var hotelId = 1; 
            var hotel = new Hotel { HotelAmenities = new List<HotelAmenity>() }; 
            _mockRepository.Setup(repo => repo.GetById(hotelId)).ReturnsAsync(hotel);

            // Act
            var result = await _hotelService.GetHotelAmenities(hotelId);

            // Assert
            Assert.That(result, Is.EqualTo(hotel.HotelAmenities)); 
        }

        [Test]
        public async Task GetRoomsByHotelId_ExistingHotelId_ReturnsHotelRooms()
        {
            // Arrange
            var hotelId = 1;
            var hotel = new Hotel { Rooms = new List<Room>() };
            _mockRepository.Setup(repo => repo.GetById(hotelId)).ReturnsAsync(hotel); 

            // Act
            var result = await _hotelService.GetRoomsByHotelId(hotelId);

            // Assert
            Assert.That(result, Is.EqualTo(hotel.Rooms)); 
        }

        [Test]
        public async Task GetHotelReservations_ExistingHotelId_ReturnsHotelReservations()
        {
            // Arrange
            var hotelId = 1; 
            var rooms = new List<Room> { }; 
            var reservations = new List<Reservation> { };
            _mockRoomRepo.Setup(repo => repo.GetAllRooms()).ReturnsAsync(rooms);
            _mockReservationRepo.Setup(repo => repo.GetAllReservations()).ReturnsAsync(reservations);

            // Act
            var result = await _hotelService.GetHotelReservations(hotelId);

            // Assert
            Assert.That(result, Is.EqualTo(reservations)); 
        }

        [Test]
        public async Task GetHotelsByOwner_ValidOwnerId_ReturnsListOfHotels()
        {
            // Arrange
            int ownerId = 1;
            var hotels = new List<Hotel>
            {
                new Hotel { HotelId = 1, OwnerId = ownerId },
                new Hotel { HotelId = 2, OwnerId = ownerId },
                new Hotel { HotelId = 3, OwnerId = ownerId + 1 } 
            };
            _mockRepository.Setup(repo => repo.GetAll()).ReturnsAsync(hotels);

            // Act
            var result = await _hotelService.GetHotelsByOwner(ownerId);

            // Assert
            Assert.IsNotNull(result);
            Assert.That(result.Count, Is.EqualTo(2));
            Assert.IsTrue(result.All(h => h.OwnerId == ownerId));
        }

        [Test]
        public void GetHotelsByOwner_RepositoryThrowsException_ThrowsException()
        {
            // Arrange
            int ownerId = 1;
            _mockRepository.Setup(repo => repo.GetAll()).ThrowsAsync(new Exception("Test exception"));

            // Act & Assert
            Assert.ThrowsAsync<Exception>(async () => await _hotelService.GetHotelsByOwner(ownerId));
        }

        [Test]
        public async Task UpdateHotelDetails_ValidHotelDTO_ReturnsUpdatedHotel()
        {
            // Arrange
            var hotelDTO = new HotelDTO { Id = 1 }; 
            var existingHotel = new Hotel { }; 
            _mockRepository.Setup(repo => repo.GetById(hotelDTO.Id)).ReturnsAsync(existingHotel); 

            // Act
            var result = await _hotelService.UpdateHotelDetails(hotelDTO);

            // Assert
            Assert.That(result, Is.EqualTo(existingHotel)); 
        }

        [Test]
        public async Task GetHotelsByLocation_ValidLocation_ReturnsListOfHotels()
        {
            // Arrange
            string location = "New York";
            var hotels = new List<Hotel>
            {
                new Hotel { HotelId = 1, City = "New York" },
                new Hotel { HotelId = 2, City = "Los Angeles" },
                new Hotel { HotelId = 3, City = "New York" }
            };
            _mockRepository.Setup(repo => repo.GetAll()).ReturnsAsync(hotels);

            // Act
            var result = await _hotelService.GetHotelsByLocation(location);

            // Assert
            Assert.IsNotNull(result);
            Assert.That(result.Count, Is.EqualTo(2));
            Assert.IsTrue(result.All(h => h.City.ToLower() == location.ToLower()));
        }

        [Test]
        public async Task GetHotelsByCriteria_ValidCriteria_ReturnsListOfAvailableHotels()
        {
            // Arrange
            string location = "New York";
            DateTime checkin = DateTime.Now;
            DateTime checkout = DateTime.Now.AddDays(2);
            int capacity = 2;

            var hotels = new List<Hotel>
            {
                new Hotel
                {
                    HotelId = 1,
                    City = "New York",
                    Rooms = new List<Room>
                    {
                        new Room { RoomId = 101, Capacity = 2 }
                    }
                },
                new Hotel
                {
                    HotelId = 2,
                    City = "Los Angeles",
                    Rooms = new List<Room>
                    {
                        new Room { RoomId = 201, Capacity = 3 }
                    }
                },
                new Hotel
                {
                    HotelId = 3,
                    City = "New York",
                    Rooms = new List<Room>
                    {
                        new Room { RoomId = 301, Capacity = 2 }
                    }
                }
            };

            _mockRepository.Setup(repo => repo.GetAll()).ReturnsAsync(hotels);
            _mockReservationRepo.Setup(service => service.IsRoomAvailable(It.IsAny<int>(), It.IsAny<DateTime>(), It.IsAny<DateTime>())).ReturnsAsync(true);

            // Act
            var result = await _hotelService.GetHotelsByCriteria(location, checkin, checkout, capacity);

            // Assert
            Assert.IsNotNull(result);
            Assert.That(result.Count, Is.EqualTo(2));
            Assert.IsTrue(result.All(h => h.City.ToLower() == location.ToLower()));
        }
    }
}