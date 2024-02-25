using CozyHaven.Exceptions;
using CozyHaven.Interfaces;
using CozyHaven.Models;
using CozyHaven.Models.DTOs;
using CozyHaven.Services;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace COZYHAVENTEST
{
    [TestFixture]
    public class ReservationServiceTest
    {
        private Mock<IRepository<int, Reservation>> _mockReservationRepository;
        private Mock<IRepository<int, Room>> _mockRoomRepository;
        private Mock<IRepository<string, User>> _mockUserRepository;
        private Mock<ILogger<ReservationService>> _mockLogger;
        private IReservationService _reservationService;

        [SetUp]
        public void Setup()
        {
            _mockReservationRepository = new Mock<IRepository<int, Reservation>>();
            _mockRoomRepository = new Mock<IRepository<int, Room>>();
            _mockUserRepository = new Mock<IRepository<string, User>>();
            _mockLogger = new Mock<ILogger<ReservationService>>();
            _reservationService = new ReservationService(_mockReservationRepository.Object, _mockRoomRepository.Object, _mockUserRepository.Object, _mockLogger.Object);
        }

        [Test]
        public async Task DeleteReservation_ExistingReservationId_ReturnsDeletedReservation()
        {
            // Arrange
            var reservationId = 1; // Example reservation ID
            var reservationToDelete = new Reservation(); // Example reservation to delete
            _mockReservationRepository.Setup(repo => repo.GetById(reservationId)).ReturnsAsync(reservationToDelete); // Mock GetById method to return the reservation
            _mockReservationRepository.Setup(repo => repo.Delete(reservationId)).ReturnsAsync(reservationToDelete); // Mock Delete method to return the deleted reservation

            // Act
            var result = await _reservationService.DeleteReservation(reservationId);

            // Assert
            Assert.IsNotNull(result); // Check if the result is not null
        }

        [Test]
        public async Task GetAllReservations_ReturnsListOfReservations()
        {
            // Arrange
            var reservations = new List<Reservation>(); // Example list of reservations
            _mockReservationRepository.Setup(repo => repo.GetAll()).ReturnsAsync(reservations); // Mock repository setup

            // Act
            var result = await _reservationService.GetAllReservations();

            // Assert
            Assert.IsNotNull(result); // Check if the result is not null
        }

        [Test]
        public async Task GetReservation_ExistingReservationId_ReturnsReservation()
        {
            // Arrange
            var reservationId = 1; // Example reservation ID
            var reservation = new Reservation(); // Example reservation
            _mockReservationRepository.Setup(repo => repo.GetById(reservationId)).ReturnsAsync(reservation); // Mock repository setup

            // Act
            var result = await _reservationService.GetReservation(reservationId);

            // Assert
            Assert.IsNotNull(result); // Check if the result is not null
        }

        [Test]
        public async Task GetReservationsByRoomId_ExistingRoomId_ReturnsListOfReservations()
        {
            // Arrange
            var roomId = 1; // Example room ID
            var reservations = new List<Reservation>(); // Example list of reservations
            _mockReservationRepository.Setup(repo => repo.GetAll()).ReturnsAsync(reservations); // Mock repository setup

            // Act
            var result = await _reservationService.GetReservationsByRoomId(roomId);

            // Assert
            Assert.IsNotNull(result); // Check if the result is not null
        }

        [Test]
        public async Task GetReservationsCount_ReturnsNumberOfReservations()
        {
            // Arrange
            var reservations = new List<Reservation>(); // Example list of reservations
            _mockReservationRepository.Setup(repo => repo.GetAll()).ReturnsAsync(reservations); // Mock repository setup

            // Act
            var result = await _reservationService.GetReservationsCount();

            // Assert
            Assert.IsNotNull(result); // Check if the result is not null
        }

        [Test]
        public async Task UpdateReservationStatus_ExistingReservationId_ReturnsUpdatedReservation()
        {
            // Arrange
            var reservationId = 1; // Example reservation ID
            var status = BookingStatus.CheckedOut; // Example status
            var reservation = new Reservation
            {
                Room = new Room() // Ensure the Room property is initialized
            }; // Example reservation
            _mockReservationRepository.Setup(repo => repo.GetById(reservationId)).ReturnsAsync(reservation); // Mock GetById method to return the reservation
            _mockReservationRepository.Setup(repo => repo.Update(It.IsAny<Reservation>())).ReturnsAsync(reservation); // Mock Update method

            // Act
            var result = await _reservationService.UpdateReservationStatus(reservationId, status);

            // Assert
            Assert.IsNotNull(result); // Check if the result is not null
        }

        [Test]
        public async Task GetHotelReservations_ExistingHotelId_ReturnsListOfReservations()
        {
            // Arrange
            var hotelId = 1; // Example hotel ID
            var rooms = new List<Room>(); // Example list of rooms
            var reservations = new List<Reservation>(); // Example list of reservations
            _mockRoomRepository.Setup(repo => repo.GetAll()).ReturnsAsync(rooms); // Mock room repository setup
            _mockReservationRepository.Setup(repo => repo.GetAll()).ReturnsAsync(reservations); // Mock reservation repository setup

            // Act
            var result = await _reservationService.GetHotelReservations(hotelId);

            // Assert
            Assert.IsNotNull(result); // Check if the result is not null
        }

        [Test]
        public async Task IsRoomAvailable_AvailableRoom_ReturnsTrue()
        {
            // Arrange
            var roomId = 1; // Example room ID
            var checkInDate = DateTime.Now.AddDays(5); // Example check-in date
            var checkOutDate = DateTime.Now.AddDays(10); // Example check-out date
            var reservations = new List<Reservation>(); // Example list of reservations
            _mockReservationRepository.Setup(repo => repo.GetAll()).ReturnsAsync(reservations); // Mock repository setup

            // Act
            var result = await _reservationService.IsRoomAvailable(roomId, checkInDate, checkOutDate);

            // Assert
            Assert.IsTrue(result); // Check if the result is true
        }

        [Test]
        public async Task AddReservation_ValidReservationDTO_ReturnsAddedReservation()
        {
            // Arrange
            var reservationDto = new ReservationDTO
            {
                // Provide valid values for the reservation DTO
                CheckInDate = DateTime.Now.AddDays(1), // Example check-in date
                CheckOutDate = DateTime.Now.AddDays(3), // Example check-out date
                                                        // Add other properties as needed
            };
            var username = "testuser"; // Example username
            var reservation = new Reservation(); // Example added reservation
            _mockReservationRepository.Setup(repo => repo.Add(It.IsAny<Reservation>())).ReturnsAsync(reservation); // Mock Add method to return the added reservation
            _mockUserRepository.Setup(repo => repo.GetById(username)).ReturnsAsync(new User()); // Mock GetById method of UserRepository
            _mockRoomRepository.Setup(repo => repo.GetById(It.IsAny<int>())).ReturnsAsync(new Room()); // Mock GetById method of RoomRepository
            _mockReservationRepository.Setup(repo => repo.GetAll()).ReturnsAsync(new List<Reservation>()); // Mock GetAll method to return an empty list of reservations

            // Act
            var result = await _reservationService.AddReservation(reservationDto, username);

            // Assert
            Assert.IsNotNull(result); // Check if the result is not null
        }
    }
}
