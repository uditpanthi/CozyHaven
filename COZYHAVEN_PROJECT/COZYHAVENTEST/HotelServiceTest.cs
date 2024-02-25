﻿using CozyHaven.Interfaces;
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
        private Mock<IRepository<int, Room>> _mockRoomRepo;
        private Mock<IRepository<int, Reservation>> _mockReservationRepo;
        private IHotelService _hotelService;

        [SetUp]
        public void Setup()
        {
            _mockRepository = new Mock<IRepository<int, Hotel>>();
            _mockLogger = new Mock<ILogger<HotelService>>();
            _mockRoomRepo = new Mock<IRepository<int, Room>>();
            _mockReservationRepo = new Mock<IRepository<int, Reservation>>();
            _hotelService = new HotelService(_mockRepository.Object, _mockLogger.Object, _mockRoomRepo.Object, _mockReservationRepo.Object);
        }

        [Test]
        public async Task AddHotel_ValidHotelDTO_ReturnsAddedHotel()
        {
            // Arrange
            var hotelDTO = new HotelDTO { ImageURLs = new List<string> { "url1", "url2" } }; // Example hotel DTO with image URLs
            var ownerId = 1; // Example owner ID
            var addedHotel = new Hotel(); // Example added hotel
            _mockRepository.Setup(repo => repo.Add(It.IsAny<Hotel>())).ReturnsAsync(addedHotel); // Mock repository setup

            // Act
            var result = await _hotelService.AddHotel(hotelDTO, ownerId);

            // Assert
            Assert.IsNotNull(result); // Check if the result is not null
        }


        [Test]
        public async Task DeleteHotel_ExistingHotelId_ReturnsDeletedHotel()
        {
            // Arrange
            var hotelId = 1; // Example hotel ID
            var hotelToDelete = new Hotel(); // Example hotel to delete
            _mockRepository.Setup(repo => repo.Delete(hotelId)).ReturnsAsync(hotelToDelete); // Mock repository setup

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
            Assert.IsNotNull(exception); // Check if the exception is not null
        }


        [Test]
        public async Task GetAllHotels_ReturnsListOfHotels()
        {
            // Arrange
            var hotels = new List<Hotel> { }; // Example list of hotels
            _mockRepository.Setup(repo => repo.GetAll()).ReturnsAsync(hotels); // Mock repository setup

            // Act
            var result = await _hotelService.GetAllHotels();

            // Assert
            Assert.AreEqual(hotels, result); // Check if the returned list of hotels matches the expected list
        }

        [Test]
        public async Task GetHotel_ExistingHotelId_ReturnsHotel()
        {
            // Arrange
            var hotelId = 1; // Example hotel ID
            var hotel = new Hotel { }; // Example hotel
            _mockRepository.Setup(repo => repo.GetById(hotelId)).ReturnsAsync(hotel); // Mock repository setup

            // Act
            var result = await _hotelService.GetHotel(hotelId);

            // Assert
            Assert.AreEqual(hotel, result); // Check if the returned hotel matches the expected hotel
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
            Assert.IsNotNull(result); // Check if the result is not null
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
            _mockRoomRepo.Setup(repo => repo.GetAll()).ReturnsAsync(rooms); // Mock room repository setup
            _mockReservationRepo.Setup(repo => repo.GetAll()).ReturnsAsync(reservations); // Mock reservation repository setup

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