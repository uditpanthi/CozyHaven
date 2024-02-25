using CozyHaven.Models.DTOs;

namespace CozyHaven.Interfaces
{
    public interface ITokenService
    {
        public Task<string> GenerateToken(LoginUserDTO user);
    }
}
