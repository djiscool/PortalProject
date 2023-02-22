using PortalProjectAPI.Dtos;
using PortalProjectAPI.Models;

namespace PortalProjectAPI.Logic
{
    public interface IUserLogic
    {
        Task<UserDto> GetUser(Guid id);
        Task<User> GetUserByEmail(string email);
        //User CheckPassword(User user, string password);
        public string HashPasword(string password, out byte[] salt);
        public bool VerifyPassword(string password, string hash, byte[] salt);
        public Task CreateUserAsync(UserDto user);
    }
}