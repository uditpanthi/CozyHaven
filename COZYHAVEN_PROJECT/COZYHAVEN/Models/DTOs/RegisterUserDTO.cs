using System.ComponentModel.DataAnnotations;

namespace CozyHaven.Models.DTOs
{
    public class RegisterUserDTO
    {
        public string Username { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string ContactNumber {  get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
        public DateTime DateofBirth { get; set; }
        public UserType UserType { get; set; }
    }
}

