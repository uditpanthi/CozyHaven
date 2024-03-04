using CozyHaven.Models.DTOs;
using CozyHaven.Models;
using System;
using System.Security.Cryptography;
using System.Text;

namespace CozyHaven.Mappers
{
    public class RegisterToUser
    {
        private readonly User user;

        public RegisterToUser(RegisterUserDTO registerUserDto)
        {
            if (registerUserDto == null)
                throw new ArgumentNullException(nameof(registerUserDto));

            user = new User();
            user.DateofBirth=registerUserDto.DateofBirth;
            user.Username = registerUserDto.Username;
            user.UserType = registerUserDto.UserType;
            user.FirstName = registerUserDto.FirstName;
            user.LastName = registerUserDto.LastName;
            user.Email = registerUserDto.Email;
            user.RegistrationDate = DateTime.Now.Date;
            user.ContactNumber = registerUserDto.ContactNumber;
            
            byte[] salt = GenerateSalt();
            user.Key = salt;

            
            user.Password = HashPassword(registerUserDto.Password, salt);
        }

        private byte[] GenerateSalt()
        {
            byte[] salt = new byte[32];
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetNonZeroBytes(salt);
            }
            return salt;
        }

        private byte[] HashPassword(string password, byte[] salt)
        {
            using (var hmac = new HMACSHA512(salt))
            {
                return hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        public User GetUser()
        {
            return user;
        }
    }
}
