using CozyHaven.Exceptions;
using CozyHaven.Interfaces;
using CozyHaven.Mappers;
using CozyHaven.Models;
using CozyHaven.Models.DTOs;
using CozyHaven.Repository;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Text;

namespace CozyHaven.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<string, User> _repo;
        private readonly ILogger<UserService> _logger;
        private readonly ITokenService _tokenservice;

        public UserService(IRepository<string,User> repository,ILogger<UserService> logger,ITokenService tokenService) {
            _repo=repository;
            _logger=logger;
            _tokenservice=tokenService;
        }
        public async Task<LoginUserDTO> Login(LoginUserDTO user)
        {
            _logger.LogInformation("Logging in user: {Username}", user.Username);
            var myuser = await _repo.GetById(user.Username);
            if(myuser == null) {
                _logger.LogWarning("User not found: {Username}", user.Username);
                throw new InvalidUserException(); 
            }
            var userPassword = GetPasswordEncrypted(user.Password, myuser.Key);
            var checkPasswordMatch = ComparePasswords(myuser.Password, userPassword);
            if (checkPasswordMatch)
            {
                user.Password = "";
                user.Role = myuser.UserType.ToString();
                user.Token = await _tokenservice.GenerateToken(user);
                _logger.LogInformation("User logged in successfully: {Username}", user.Username);
                return user;
            }
            throw new InvalidUserException();
        }
        private bool ComparePasswords(byte[] password, byte[] userPassword)
        {
            for (int i = 0; i < password.Length; i++)
            {
                if (password[i] != userPassword[i])
                    return false;
            }
            return true;
        }

        private byte[] GetPasswordEncrypted(string password, byte[] key)
        {
            HMACSHA512 hmac = new HMACSHA512(key);
            var userpassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return userpassword;
        }

        public async Task<LoginUserDTO> Register(RegisterUserDTO user)
        {
            _logger.LogInformation("Registering for user: {Username}", user.Username);
            User myuser=new RegisterToUser(user).GetUser();
            myuser=await _repo.Add(myuser);
            LoginUserDTO result = new LoginUserDTO
            {
                Username = myuser.Username,
                Role = myuser.UserType.ToString(),
            };
            return result;
        }

        public Task<List<User>> GetAllUsers()
        {
            _logger.LogInformation("Getting all the Users");
            var users = _repo.GetAll();
            if(users!=null) return users;
            throw new UserNotFoundException();
        }

        public Task<User> GetUser(string username)
        {
            _logger.LogInformation("Getting user: {Username}", username);
            var user = _repo.GetById(username);
            if (user == null) throw new UserNotFoundException(username);
            return user;
        }

        public async Task<User> DeleteUser(string username)
        {
            _logger.LogInformation("Deleting user: {Username}", username);
            var user = await GetUser(username   );
            if (user != null)
            {
                await _repo.Delete(username);
                return user;
            }
            throw new UserNotFoundException(username);
        }

        public async Task<User> UpdatePassword(string username,string password)
        {
            _logger.LogInformation("Updating password for user: {Username}", username);
            var user = await _repo.GetById(username);
            if (user != null)
            { 
                var newKey = new HMACSHA512().Key;
                var newPasswordHash = GetPasswordEncrypted(password,newKey);

                user.Password = newPasswordHash;
                user.Key = newKey;
                await _repo.Update(user);
                _logger.LogInformation("Password updated successfully for user: {Username}", username);
                return user;
            }
            throw new UserNotFoundException(username);
        }

        public async Task<ICollection<Reservation>> GetUserReservations(string username)
        {
            _logger.LogInformation("Getting User Reservations: {Username}", username);
            var user= await _repo.GetById(username);
            if (user != null)
            {
                var Reservations = user.Reservations;
                if(Reservations.IsNullOrEmpty()) throw new ReservationNotFoundException(username);
                return Reservations;
            }
            throw new UserNotFoundException(username);
        }
        public async Task<User> UpdateUserProfile(string username, string firstName, string lastName, string contactNumber, string email, DateTime dateofbirth)
        {
            _logger.LogInformation("Updating user profile: {Username}", username);
            var existingUser = await GetUser(username);
            if (existingUser != null)
            {
                existingUser.Username = username;
                existingUser.FirstName = firstName;
                existingUser.LastName = lastName;
                existingUser.ContactNumber = contactNumber;
                existingUser.Email = email;
                existingUser.DateofBirth = dateofbirth;

                existingUser = await _repo.Update(existingUser);
                return existingUser;
            }
            return null;
        }
        public async Task<ICollection<Review>> GetUserReviews(string username)
        {
            _logger.LogInformation("Getting Reviews for user: {Username}", username);
            var user = await GetUser(username); 
            if (user != null)
            {
                var reviews=user.Reviews;
                if(reviews.IsNullOrEmpty()) { throw new ReviewNotFoundException(username); }
                return reviews;
            }
            throw new UserNotFoundException(username);
        }
       
        public async Task<User> GetUserByUsernameOrEmail(string usernameOrEmail)
        {
            _logger.LogInformation("Getting user by : {usernameOrEmail}", usernameOrEmail);
            var users = await _repo.GetAll();
            var user = users.FirstOrDefault(u => u.Username == usernameOrEmail || u.Email == usernameOrEmail);
            if (user != null) return user;
            throw new UserNotFoundException(usernameOrEmail);
        }
        public async Task<List<User>> GetHotelOwners()
        {
            _logger.LogInformation("Getting Hotel Owners");
            var users = await _repo.GetAll();
            if (users == null || !users.Any())
            {
                throw new UserNotFoundException();
            } 

            return users.Where(user => user.UserType == UserType.HotelOwner).ToList();
        }

        public async Task<User> GetUserbyId(int userId)
        {
            try
            {
                _logger.LogInformation("Getting user by ID: {UserId}", userId);

                var users = await _repo.GetAll();

                var user = users.FirstOrDefault(u => u.UserId == userId);

                if (user != null)
                {
                    _logger.LogInformation("User found by ID: {UserId}", userId);
                    return user;
                }
                else
                {
                    _logger.LogWarning("User not found by ID: {UserId}", userId);
                    throw new UserNotFoundException($"User with ID {userId} not found");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting user by ID: {UserId}", userId);
                throw; 
            }
        }

    }
}
