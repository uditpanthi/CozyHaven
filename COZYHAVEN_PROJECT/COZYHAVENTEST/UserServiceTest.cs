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
    public class UserServiceTest
    {
        private Mock<IRepository<string, User>> _mockRepository;
        private Mock<ILogger<UserService>> _mockLogger;
        private Mock<ITokenService> _mockTokenService;
        private IUserService _userService;

        [SetUp]
        public void Setup()
        {
            _mockRepository = new Mock<IRepository<string, User>>();
            _mockLogger = new Mock<ILogger<UserService>>();
            _mockTokenService = new Mock<ITokenService>();
            _userService = new UserService(_mockRepository.Object, _mockLogger.Object, _mockTokenService.Object);
        }

        //[Test]
        //public async Task Login_ValidUser_ReturnsLoginUserDTO()
        //{
        //    // Arrange
        //    var user = new User { Username = "testuser", Password = new byte[64], Key = new byte[64], UserType = UserType.Admin };
        //    var loginUserDTO = new LoginUserDTO { Username = "testuser", Password = "password" };
        //    _mockRepository.Setup(repo => repo.GetById(user.Username)).ReturnsAsync(user);
        //    _mockTokenService.Setup(service => service.GenerateToken(It.IsAny<LoginUserDTO>())).ReturnsAsync("mocked-token");

        //    // Act
        //    var result = await _userService.Login(loginUserDTO);

        //    // Assert
        //    Assert.IsNotNull(result);
        //    Assert.AreEqual(loginUserDTO.Username, result.Username);
        //    Assert.AreEqual(user.UserType.ToString(), result.Role);
        //    Assert.AreEqual("mocked-token", result.Token);
        //}

        [Test]
        public void Login_InvalidUser_ThrowsInvalidUserException()
        {
            // Arrange
            var loginUserDTO = new LoginUserDTO { Username = "nonexistentuser", Password = "password" };
            _mockRepository.Setup(repo => repo.GetById(loginUserDTO.Username)).ReturnsAsync((User)null);

            // Act & Assert
            Assert.ThrowsAsync<InvalidUserException>(async () => await _userService.Login(loginUserDTO));
        }

        [Test]
        public async Task Register_ValidUser_ReturnsLoginUserDTO()
        {
            // Arrange
            var registerUserDTO = new RegisterUserDTO { Username = "testuser", Password = "password" };
            var user = new User { Username = "testuser", Password = new byte[64], Key = new byte[64], UserType = UserType.Customer };
            _mockRepository.Setup(repo => repo.Add(It.IsAny<User>())).ReturnsAsync(user);

            // Act
            var result = await _userService.Register(registerUserDTO);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Username, Is.EqualTo(registerUserDTO.Username));
        }

        [Test]
        public async Task GetAllUsers_ReturnsListOfUsers()
        {
            // Arrange
            var users = new List<User> { new User(), new User() };
            _mockRepository.Setup(repo => repo.GetAll()).ReturnsAsync(users);

            // Act
            var result = await _userService.GetAllUsers();

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(users.Count));
        }

        [Test]
        public async Task GetUser_ExistingUser_ReturnsUser()
        {
            // Arrange
            var username = "existinguser";
            var user = new User { Username = username };
            _mockRepository.Setup(repo => repo.GetById(username)).ReturnsAsync(user);

            // Act
            var result = await _userService.GetUser(username);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Username, Is.EqualTo(username));
        }


        //[Test]
        //public void GetUser_NonExistingUser_ThrowsUserNotFoundException()
        //{
        //    // Arrange
        //    var username = "nonexistentuser";
        //    _mockRepository.Setup(repo => repo.GetById(username)).ReturnsAsync((User)null);

        //    // Act & Assert
        //    Assert.ThrowsAsync<UserNotFoundException>(async () => await _userService.GetUser(username));
        //}

        [Test]
        public async Task DeleteUser_ExistingUser_ReturnsDeletedUser()
        {
            // Arrange
            var username = "existinguser";
            var user = new User { Username = username };
            _mockRepository.Setup(repo => repo.GetById(username)).ReturnsAsync(user);
            _mockRepository.Setup(repo => repo.Delete(username)).ReturnsAsync(user);

            // Act
            var result = await _userService.DeleteUser(username);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(username, result.Username);
        }

        [Test]
        public void DeleteUser_NonExistingUser_ThrowsUserNotFoundException()
        {
            // Arrange
            var username = "nonexistentuser";
            _mockRepository.Setup(repo => repo.GetById(username)).ReturnsAsync((User)null);

            // Act & Assert
            Assert.ThrowsAsync<UserNotFoundException>(async () => await _userService.DeleteUser(username));
        }

        [Test]
        public async Task UpdatePassword_ExistingUser_ReturnsUpdatedUser()
        {
            // Arrange
            var username = "existinguser";
            var newPassword = "newpassword";
            var user = new User { Username = username, Password = new byte[64], Key = new byte[64] };
            _mockRepository.Setup(repo => repo.GetById(username)).ReturnsAsync(user);
            _mockRepository.Setup(repo => repo.Update(user)).ReturnsAsync(user);

            // Act
            var result = await _userService.UpdatePassword(username, newPassword);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Username, Is.EqualTo(username));
        }


        [Test]
        public void UpdatePassword_NonExistingUser_ThrowsUserNotFoundException()
        {
            // Arrange
            var username = "nonexistentuser";
            var newPassword = "newpassword";
            _mockRepository.Setup(repo => repo.GetById(username)).ReturnsAsync((User?)null);

            // Act & Assert
            Assert.ThrowsAsync<UserNotFoundException>(async () => await _userService.UpdatePassword(username, newPassword));
        }



        [Test]
        public async Task GetUserReservations_ExistingUserWithReservations_ReturnsReservations()
        {
            // Arrange
            var username = "existinguser";
            var user = new User { Username = username, Reservations = new List<Reservation> { new Reservation(), new Reservation() } };
            _mockRepository.Setup(repo => repo.GetById(username)).ReturnsAsync(user);

            // Act
            var result = await _userService.GetUserReservations(username);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(user.Reservations.Count));
        }

        [Test]
        public void GetUserReservations_ExistingUserWithoutReservations_ThrowsReservationNotFoundException()
        {
            // Arrange
            var username = "existinguser";
            var user = new User { Username = username, Reservations = new List<Reservation>() };
            _mockRepository.Setup(repo => repo.GetById(username)).ReturnsAsync(user);

            // Act & Assert
            Assert.ThrowsAsync<ReservationNotFoundException>(async () => await _userService.GetUserReservations(username));
        }

        [Test]
        public async Task UpdateUserProfile_ExistingUser_ReturnsUpdatedUser()
        {
            // Arrange
            var username = "existinguser";
            var firstName = "John";
            var lastName = "Doe";
            var contactNumber = "1234567890";
            var email = "john.doe@example.com";
            var dateOfBirth = new DateTime(1990, 1, 1);
            var user = new User { Username = username, FirstName = "Old", LastName = "Name", ContactNumber = "0000000000", Email = "old@example.com", DateofBirth = DateTime.Now };
            _mockRepository.Setup(repo => repo.GetById(username)).ReturnsAsync(user);
            _mockRepository.Setup(repo => repo.Update(user)).ReturnsAsync(user);

            // Act
            var result = await _userService.UpdateUserProfile(username, firstName, lastName, contactNumber, email, dateOfBirth);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Username, Is.EqualTo(username));
            Assert.That(result.FirstName, Is.EqualTo(firstName));
            Assert.That(result.LastName, Is.EqualTo(lastName));
            Assert.That(result.ContactNumber, Is.EqualTo(contactNumber));
            Assert.That(result.Email, Is.EqualTo(email));
            Assert.That(result.DateofBirth, Is.EqualTo(dateOfBirth));
        }


        //[Test]
        //public void UpdateUserProfile_NonExistingUser_ThrowsUserNotFoundException()
        //{
        //    // Arrange
        //    var username = "nonexistentuser";
        //    var firstName = "John";
        //    var lastName = "Doe";
        //    var contactNumber = "1234567890";
        //    var email = "john.doe@example.com";
        //    var dateOfBirth = new DateTime(1990, 1, 1);
        //    _mockRepository.Setup(repo => repo.GetById(username)).ReturnsAsync((User)null);

        //    // Act & Assert
        //    Assert.ThrowsAsync<UserNotFoundException>(async () => await _userService.UpdateUserProfile(username, firstName, lastName, contactNumber, email, dateOfBirth));
        //}

        [Test]
        public async Task GetUserReviews_ExistingUserWithReviews_ReturnsReviews()
        {
            // Arrange
            var username = "existinguser";
            var user = new User { Username = username, Reviews = new List<Review> { new Review(), new Review() } };
            _mockRepository.Setup(repo => repo.GetById(username)).ReturnsAsync(user);

            // Act
            var result = await _userService.GetUserReviews(username);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(user.Reviews.Count));
        }

        [Test]
        public void GetUserReviews_ExistingUserWithoutReviews_ThrowsReviewNotFoundException()
        {
            // Arrange
            var username = "existinguser";
            var user = new User { Username = username, Reviews = new List<Review>() };
            _mockRepository.Setup(repo => repo.GetById(username)).ReturnsAsync(user);

            // Act & Assert
            Assert.ThrowsAsync<ReviewNotFoundException>(async () => await _userService.GetUserReviews(username));
        }

        [Test]
        public async Task GetUserByUsernameOrEmail_ExistingUser_ReturnsUser()
        {
            // Arrange
            var usernameOrEmail = "existinguser";
            var user = new User { Username = usernameOrEmail };
            var users = new List<User> { user };
            _mockRepository.Setup(repo => repo.GetAll()).ReturnsAsync(users);

            // Act
            var result = await _userService.GetUserByUsernameOrEmail(usernameOrEmail);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Username, Is.EqualTo(usernameOrEmail));
        }

        [Test]
        public void GetUserByUsernameOrEmail_NonExistingUser_ThrowsUserNotFoundException()
        {
            // Arrange
            var usernameOrEmail = "nonexistentuser";
            var users = new List<User>();
            _mockRepository.Setup(repo => repo.GetAll()).ReturnsAsync(users);

            // Act & Assert
            Assert.ThrowsAsync<UserNotFoundException>(async () => await _userService.GetUserByUsernameOrEmail(usernameOrEmail));
        }

        [Test]
        public async Task GetHotelOwners_ExistingHotelOwners_ReturnsListOfHotelOwners()
        {
            // Arrange
            var users = new List<User>
            {
                new User { Username = "owner1", UserType = UserType.HotelOwner },
                new User { Username = "owner2", UserType = UserType.HotelOwner },
                new User { Username = "customer", UserType = UserType.Customer }
            };
            _mockRepository.Setup(repo => repo.GetAll()).ReturnsAsync(users);

            // Act
            var result = await _userService.GetHotelOwners();

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(2));
            Assert.That(result.All(user => user.UserType == UserType.HotelOwner), Is.True);
        }

        //    [Test]
        //    public void GetHotelOwners_NoHotelOwners_ThrowsUserNotFoundException()
        //    {
        //        // Arrange
        //        var users = new List<User>
        //{
        //    new User { Username = "customer", UserType = UserType.Customer }
        //};
        //        _mockRepository.Setup(repo => repo.GetAll()).ReturnsAsync(users);

        //        // Act & Assert
        //        Assert.ThrowsAsync<UserNotFoundException>(async () => await _userService.GetHotelOwners());
        //    }

        [Test]
        public async Task GetUserbyId_ExistingUser_ReturnsUser()
        {
            // Arrange
            var userId = 1;
            var users = new List<User>
            {
                new User { UserId = userId }
            };
            _mockRepository.Setup(repo => repo.GetAll()).ReturnsAsync(users);

            // Act
            var result = await _userService.GetUserbyId(userId);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.UserId, Is.EqualTo(userId));
        }

        [Test]
        public void GetUserbyId_NonExistingUser_ThrowsUserNotFoundException()
        {
            // Arrange
            var userId = 1;
            var users = new List<User>();
            _mockRepository.Setup(repo => repo.GetAll()).ReturnsAsync(users);

            // Act & Assert
            Assert.ThrowsAsync<UserNotFoundException>(async () => await _userService.GetUserbyId(userId));
        }
    }
}
