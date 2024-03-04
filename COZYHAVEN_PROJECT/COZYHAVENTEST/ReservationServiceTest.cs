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
            var reservationId = 1;  
            var reservationToDelete = new Reservation();  
            _mockReservationRepository.Setup(repo => repo.GetById(reservationId)).ReturnsAsync(reservationToDelete);  
            _mockReservationRepository.Setup(repo => repo.Delete(reservationId)).ReturnsAsync(reservationToDelete); 

            // Act
            var result = await _reservationService.DeleteReservation(reservationId);

            // Assert
            Assert.IsNotNull(result); 
        }

        [Test]
        public async Task GetAllReservations_ReturnsListOfReservations()
        {
            // Arrange
            var reservations = new List<Reservation>(); 
            _mockReservationRepository.Setup(repo => repo.GetAll()).ReturnsAsync(reservations); 

            // Act
            var result = await _reservationService.GetAllReservations();

            // Assert
            Assert.IsNotNull(result);
        }

        [Test]
        public async Task GetReservation_ExistingReservationId_ReturnsReservation()
        {
            // Arrange
            var reservationId = 1;  
            var reservation = new Reservation();  
            _mockReservationRepository.Setup(repo => repo.GetById(reservationId)).ReturnsAsync(reservation);

            // Act
            var result = await _reservationService.GetReservation(reservationId);

            // Assert
            Assert.IsNotNull(result); 
        }

        [Test]
        public async Task GetReservationsByRoomId_ExistingRoomId_ReturnsListOfReservations()
        {
            // Arrange
            var roomId = 1; 
            var reservations = new List<Reservation>(); 
            _mockReservationRepository.Setup(repo => repo.GetAll()).ReturnsAsync(reservations); 

            // Act
            var result = await _reservationService.GetReservationsByRoomId(roomId);

            // Assert
            Assert.IsNotNull(result); 
        }

        [Test]
        public async Task GetReservationsCount_ReturnsNumberOfReservations()
        {
            // Arrange
            var reservations = new List<Reservation>(); 
            _mockReservationRepository.Setup(repo => repo.GetAll()).ReturnsAsync(reservations); 

            // Act
            var result = await _reservationService.GetReservationsCount();

            // Assert
            Assert.IsNotNull(result); 
        }

        [Test]
        public async Task UpdateReservationStatus_ExistingReservationId_ReturnsUpdatedReservation()
        {
            // Arrange
            var reservationId = 1;  
            var status = BookingStatus.CheckedOut;  
            var reservation = new Reservation
            {
                Room = new Room()  
            };  
            _mockReservationRepository.Setup(repo => repo.GetById(reservationId)).ReturnsAsync(reservation);  
            _mockReservationRepository.Setup(repo => repo.Update(It.IsAny<Reservation>())).ReturnsAsync(reservation);  

            // Act
            var result = await _reservationService.UpdateReservationStatus(reservationId, status);

            // Assert
            Assert.IsNotNull(result); 
        }

        [Test]
        public async Task GetHotelReservations_ExistingHotelId_ReturnsListOfReservations()
        {
            // Arrange
            var hotelId = 1; 
            var rooms = new List<Room>();
            var reservations = new List<Reservation>();
            _mockRoomRepository.Setup(repo => repo.GetAll()).ReturnsAsync(rooms); 
            _mockReservationRepository.Setup(repo => repo.GetAll()).ReturnsAsync(reservations); 

            // Act
            var result = await _reservationService.GetHotelReservations(hotelId);

            // Assert
            Assert.IsNotNull(result); 
        }

        [Test]
        public async Task IsRoomAvailable_AvailableRoom_ReturnsTrue()
        {
            // Arrange
            var roomId = 1;
            var checkInDate = DateTime.Now.AddDays(5); 
            var checkOutDate = DateTime.Now.AddDays(10);
            var reservations = new List<Reservation>(); 
            _mockReservationRepository.Setup(repo => repo.GetAll()).ReturnsAsync(reservations); 

            // Act
            var result = await _reservationService.IsRoomAvailable(roomId, checkInDate, checkOutDate);

            // Assert
            Assert.IsTrue(result); 
        }

        [Test]
        public async Task AddReservation_ValidReservationDTO_ReturnsAddedReservation()
        {
            // Arrange
            var reservationDto = new ReservationDTO
            {
                CheckInDate = DateTime.Now.AddDays(1), 
                CheckOutDate = DateTime.Now.AddDays(3),
            };
            var username = "testuser"; 
            var reservation = new Reservation(); 
            _mockReservationRepository.Setup(repo => repo.Add(It.IsAny<Reservation>())).ReturnsAsync(reservation);
            _mockUserRepository.Setup(repo => repo.GetById(username)).ReturnsAsync(new User());
            _mockRoomRepository.Setup(repo => repo.GetById(It.IsAny<int>())).ReturnsAsync(new Room()); 
            _mockReservationRepository.Setup(repo => repo.GetAll()).ReturnsAsync(new List<Reservation>());

            // Act
            var result = await _reservationService.AddReservation(reservationDto, username);

            // Assert
            Assert.IsNotNull(result); 
        }
    }
}
