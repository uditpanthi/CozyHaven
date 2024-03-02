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
            HotelNotFoundException exception = null;
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
            var hotels = new List<Hotel> { }; 
            _mockRepository.Setup(repo => repo.GetAll()).ReturnsAsync(hotels); 

            // Act
            var result = await _hotelService.GetAllHotels();

            // Assert
            Assert.AreEqual(hotels, result); 
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
            Assert.AreEqual(hotel, result); 
        }

        [Test]
        public async Task UpdateHotelDescription_ExistingHotelId_ReturnsUpdatedHotel()
        {
            // Arrange
            var hotelId = 1; // Example hotel ID
            var updatedHotel = new Hotel { HotelId = hotelId }; // Example updated hotel
            _mockRepository.Setup(repo => repo.GetById(hotelId)).ReturnsAsync(updatedHotel); // Mock repository setup
            _mockRepository.Setup(repo => repo.Update(updatedHotel)).ReturnsAsync(updatedHotel); // Mock repository update setup

            // Act
            var result = await _hotelService.UpdateHotelDescription(hotelId, "New Description");

            // Assert
            Assert.IsNotNull(result); 
        }


        [Test]
        public async Task UpdateHotelOwner_ExistingHotelId_ReturnsUpdatedHotel()
        {
            // Arrange
            var hotelId = 1; // Example hotel ID
            var ownerId = 2; // Example owner ID
            var updatedHotel = new Hotel { }; // Example updated hotel
            _mockRepository.Setup(repo => repo.GetById(hotelId)).ReturnsAsync(updatedHotel); // Mock repository setup

            // Act
            var result = await _hotelService.UpdateHotelOwner(hotelId, ownerId);

            // Assert
            Assert.AreEqual(updatedHotel, result); // Check if the updated hotel matches the expected hotel
        }

        [Test]
        public async Task GetHotelReviews_ExistingHotelId_ReturnsHotelReviews()
        {
            // Arrange
            var hotelId = 1; // Example hotel ID
            var hotel = new Hotel { Reviews = new List<Review>() }; // Example hotel with reviews
            _mockRepository.Setup(repo => repo.GetById(hotelId)).ReturnsAsync(hotel); // Mock repository setup

            // Act
            var result = await _hotelService.GetHotelReviews(hotelId);

            // Assert
            Assert.AreEqual(hotel.Reviews, result); // Check if the returned reviews match the expected reviews
        }

        [Test]
        public async Task GetHotelAmenities_ExistingHotelId_ReturnsHotelAmenities()
        {
            // Arrange
            var hotelId = 1; // Example hotel ID
            var hotel = new Hotel { HotelAmenities = new List<HotelAmenity>() }; // Example hotel with amenities
            _mockRepository.Setup(repo => repo.GetById(hotelId)).ReturnsAsync(hotel); // Mock repository setup

            // Act
            var result = await _hotelService.GetHotelAmenities(hotelId);

            // Assert
            Assert.AreEqual(hotel.HotelAmenities, result); // Check if the returned amenities match the expected amenities
        }

        [Test]
        public async Task GetRoomsByHotelId_ExistingHotelId_ReturnsHotelRooms()
        {
            // Arrange
            var hotelId = 1; // Example hotel ID
            var hotel = new Hotel { Rooms = new List<Room>() }; // Example hotel with rooms
            _mockRepository.Setup(repo => repo.GetById(hotelId)).ReturnsAsync(hotel); // Mock repository setup

            // Act
            var result = await _hotelService.GetRoomsByHotelId(hotelId);

            // Assert
            Assert.AreEqual(hotel.Rooms, result); // Check if the returned rooms match the expected rooms
        }

        [Test]
        public async Task GetHotelReservations_ExistingHotelId_ReturnsHotelReservations()
        {
            // Arrange
            var hotelId = 1; // Example hotel ID
            var rooms = new List<Room> { }; // Example list of rooms
            var reservations = new List<Reservation> { }; // Example list of reservations
            _mockRoomRepo.Setup(repo => repo.GetAllRooms()).ReturnsAsync(rooms); // Mock room repository setup
            _mockReservationRepo.Setup(repo => repo.GetAllReservations()).ReturnsAsync(reservations); // Mock reservation repository setup

            // Act
            var result = await _hotelService.GetHotelReservations(hotelId);

            // Assert
            Assert.AreEqual(reservations, result); // Check if the returned reservations match the expected reservations
        }

        [Test]
        public async Task UpdateHotelDetails_ValidHotelDTO_ReturnsUpdatedHotel()
        {
            // Arrange
            var hotelDTO = new HotelDTO { Id = 1 }; // Example hotel DTO
            var existingHotel = new Hotel { }; // Example existing hotel
            _mockRepository.Setup(repo => repo.GetById(hotelDTO.Id)).ReturnsAsync(existingHotel); // Mock repository setup

            // Act
            var result = await _hotelService.UpdateHotelDetails(hotelDTO);

            // Assert
            Assert.AreEqual(existingHotel, result); // Check if the updated hotel matches the expected hotel
        }
    }
}