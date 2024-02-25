using CozyHaven.Models.DTOs;
using CozyHaven.Models;

namespace CozyHaven.Mappers
{
    public class UserMapping
    {
        public static UserDTO MapUserToDTO(User user)
        {
            return new UserDTO
            {
                Username=user.Username,
                FirstName=user.FirstName,
                LastName=user.LastName,
                Email=user.Email,
                Phone=user.ContactNumber,

            };
        }

        public static User MapUserDTOToEntity(UserDTO userDTO)
        {
            return new User
            {
                Username = userDTO.Username,
                FirstName = userDTO.FirstName,
                LastName = userDTO.LastName,
                Email=userDTO.Email,
                ContactNumber=userDTO.Phone,
            };
        }
    }
}
