using System;
using System.Collections.Generic;
using System.Linq;
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
    public class RoomServiceTest
    {
        private Mock<IRepository<int, Room>> _mockRepository;
        private Mock<ILogger<IRoomService>> _mockLogger;
        private IRoomService _roomService;

        [SetUp]
        public void SetUp()
        {
            _mockRepository = new Mock<IRepository<int, Room>>();
            _mockLogger = new Mock<ILogger<IRoomService>>();
            _roomService = new RoomService(_mockRepository.Object, _mockLogger.Object);
        }

        [Test]
        public async Task AddRoom_ValidRoomDto_ReturnsAddedRoom()
        {
            // Arrange
            var roomDto = new RoomDTO
            {
                RoomId = 1,
                RoomSize = 20,
                RoomType = "Double",
                PricePerNight = 100,
                Capacity = 2,
                Available = true
            };
            var expectedRoom = new Room
            {
                RoomId = 1,
                RoomSize = 20,
                RoomType = "Double",
                PricePerNight = 100,
                Capacity = 2,
                Available = true
            };
            _mockRepository.Setup(repo => repo.Add(It.IsAny<Room>())).ReturnsAsync(expectedRoom);

            // Act
            var result = await _roomService.AddRoom(roomDto);

            // Assert
            Assert.That(result, Is.EqualTo(expectedRoom));
        }

        [Test]
        public async Task DeleteRoom_ExistingRoomId_ReturnsDeletedRoom()
        {
            // Arrange
            var roomId = 1; 
            var roomToDelete = new Room { RoomId = roomId }; 
            _mockRepository.Setup(repo => repo.GetById(roomId)).ReturnsAsync(roomToDelete); 

            // Act
            var result = await _roomService.DeleteRoom(roomId);

            // Assert
            Assert.That(result, Is.EqualTo(roomToDelete)); 
        }

        [Test]
        public async Task GetAllRooms_ReturnsListOfRooms()
        {
            // Arrange
            var expectedRooms = new List<Room>
            {
                new Room { RoomId = 1, RoomSize = 20, RoomType = "Double", PricePerNight = 100, Capacity = 2, Available = true },
                new Room { RoomId = 2, RoomSize = 25, RoomType = "Single", PricePerNight = 80, Capacity = 1, Available = true }
            };
            _mockRepository.Setup(repo => repo.GetAll()).ReturnsAsync(expectedRooms);

            // Act
            var result = await _roomService.GetAllRooms();

            // Assert
            CollectionAssert.AreEqual(expectedRooms, result);
        }

        [Test]
        public async Task GetRoom_ExistingRoomId_ReturnsRoom()
        {
            // Arrange
            var roomId = 1;
            var expectedRoom = new Room
            {
                RoomId = roomId,
                RoomSize = 20,
                RoomType = "Double",
                PricePerNight = 100,
                Capacity = 2,
                Available = true
            };
            _mockRepository.Setup(repo => repo.GetById(roomId)).ReturnsAsync(expectedRoom);

            // Act
            var result = await _roomService.GetRoom(roomId);

            // Assert
            Assert.That(result, Is.EqualTo(expectedRoom));
        }

        [Test]
        public void GetRoom_NonExistingRoomId_ThrowsRoomNotFoundException()
        {
            // Arrange
            var roomId = 1;
            _mockRepository.Setup(repo => repo.GetById(roomId)).ReturnsAsync((Room)null);

            // Act & Assert
            Assert.ThrowsAsync<RoomNotFoundException>(() => _roomService.GetRoom(roomId));
        }

        [Test]
        public async Task GetRoomReservations_ExistingRoomId_ReturnsRoomReservations()
        {
            // Arrange
            var roomId = 1;
            var reservations = new List<Reservation>
            {
                new Reservation { ReservationId = 1, RoomId = roomId, CheckInDate = DateTime.Now, CheckOutDate = DateTime.Now.AddDays(3) },
                new Reservation { ReservationId = 2, RoomId = roomId, CheckInDate = DateTime.Now.AddDays(5), CheckOutDate = DateTime.Now.AddDays(7) }
            };
            var room = new Room { RoomId = roomId, RoomSize = 20, RoomType = "Double", PricePerNight = 100, Capacity = 2, Available = true, Reservations = reservations };
            _mockRepository.Setup(repo => repo.GetById(roomId)).ReturnsAsync(room);

            // Act
            var result = await _roomService.GetRoomReservations(roomId);

            // Assert
            CollectionAssert.AreEqual(reservations, result);
        }

        [Test]
        public void GetRoomReservations_NonExistingRoomId_ThrowsRoomNotFoundException()
        {
            // Arrange
            var roomId = 1;
            _mockRepository.Setup(repo => repo.GetById(roomId)).ReturnsAsync((Room)null);

            // Act & Assert
            Assert.ThrowsAsync<RoomNotFoundException>(() => _roomService.GetRoomReservations(roomId));
        }

        [Test]
        public void GetRoomReservations_NullReservations_ThrowsRoomNotFoundException()
        {
            // Arrange
            var roomId = 1;
            var room = new Room { RoomId = roomId, RoomSize = 20, RoomType = "Double", PricePerNight = 100, Capacity = 2, Available = true, Reservations = null };
            _mockRepository.Setup(repo => repo.GetById(roomId)).ReturnsAsync(room);

            // Act & Assert
            Assert.ThrowsAsync<RoomNotFoundException>(() => _roomService.GetRoomReservations(roomId));
        }


        [Test]
        public async Task UpdateRoomPrice_ExistingRoomId_ReturnsUpdatedRoom()
        {
            // Arrange
            var roomId = 1; 
            var updatedRoom = new Room(); 
            _mockRepository.Setup(repo => repo.GetById(roomId)).ReturnsAsync(updatedRoom); 

            // Act
            var result = await _roomService.UpdateRoomPrice(roomId, 100); 

            // Assert
            Assert.That(result, Is.EqualTo(updatedRoom)); 
        }

        [Test]
        public void UpdateRoomPrice_NonExistingRoomId_ThrowsRoomNotFoundException()
        {
            // Arrange
            var roomId = 1;
            var price = 120;
            _mockRepository.Setup(repo => repo.GetById(roomId)).ReturnsAsync((Room)null);

            // Act & Assert
            Assert.ThrowsAsync<RoomNotFoundException>(() => _roomService.UpdateRoomPrice(roomId, price));
        }

        [Test]
        public async Task UpdateRoomDetails_ExistingRoomDto_ReturnsUpdatedRoom()
        {
            // Arrange
            var roomDTO = new RoomDTO { RoomId = 1 }; 
            var updatedRoom = new Room(); 
            _mockRepository.Setup(repo => repo.GetById(roomDTO.RoomId)).ReturnsAsync(updatedRoom); 

            // Act
            var result = await _roomService.UpdateRoomDetails(roomDTO);

            // Assert
            Assert.That(result, Is.EqualTo(updatedRoom)); 
        }

        [Test]
        public void UpdateRoomDetails_NonExistingRoomDto_ThrowsRoomNotFoundException()
        {
            // Arrange
            var roomDto = new RoomDTO
            {
                RoomId = 1,
                RoomSize = 25,
                RoomType = "Single",
                PricePerNight = 90,
                Capacity = 1,
                Available = false
            };
            _mockRepository.Setup(repo => repo.GetById(roomDto.RoomId)).ReturnsAsync((Room)null);

            // Act & Assert
            Assert.ThrowsAsync<RoomNotFoundException>(() => _roomService.UpdateRoomDetails(roomDto));
        }

        [Test]
        public async Task GetAvailableRooms_ReturnsListOfAvailableRooms()
        {
            // Arrange
            var rooms = new List<Room>
            {
                new Room { RoomId = 1, RoomSize = 20, RoomType = "Double", PricePerNight = 100, Capacity = 2, Available = true },
                new Room { RoomId = 2, RoomSize = 25, RoomType = "Single", PricePerNight = 80, Capacity = 1, Available = false },
                new Room { RoomId = 3, RoomSize = 30, RoomType = "Double", PricePerNight = 120, Capacity = 2, Available = true }
            };
            _mockRepository.Setup(repo => repo.GetAll()).ReturnsAsync(rooms);

            // Act
            var result = await _roomService.GetAvailableRooms();

            // Assert
            Assert.That(result.Count, Is.EqualTo(2));
            Assert.IsTrue(result.All(r => r.Available));
        }

        [Test]
        public void GetAvailableRooms_NoAvailableRooms_ThrowsRoomNotFoundException()
        {
            // Arrange
            _mockRepository.Setup(repo => repo.GetAll()).ReturnsAsync((List<Room>)null);

            // Act & Assert
            Assert.ThrowsAsync<RoomNotFoundException>(() => _roomService.GetAvailableRooms());
        }
    }
}
