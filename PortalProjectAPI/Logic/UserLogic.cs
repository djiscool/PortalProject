using Microsoft.EntityFrameworkCore;
using PortalProjectAPI.Data;
using PortalProjectAPI.Dtos;
using PortalProjectAPI.Models;
using System.Security.Cryptography;
using System.Text;

namespace PortalProjectAPI.Logic
{
    public class UserLogic : IUserLogic
    {
        private readonly ApplicationDbContext _context;

        private const int keySize = 64;
        private const int iterations = 350000;
        private HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;


        public UserLogic (ApplicationDbContext context) {
            _context = context;
        }

        //public bool VerifyPassword(string password, string hash, byte[] salt)
        //{
        //    return true;
        //}

        public async Task<UserDto> GetUser(Guid id) { 
           
           return new UserDto { Id = id };
        
        }

        public async Task<User> GetUserByEmail(string email)
        {
           return await _context.Users.FirstOrDefaultAsync(a => a.Email == email);
        }

        public string HashPasword(string password, out byte[] salt)
        {
            salt = RandomNumberGenerator.GetBytes(keySize);
            var hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
            salt,
            iterations,
                hashAlgorithm,
                keySize);
            return Convert.ToHexString(hash);
        }

        public bool VerifyPassword(string password, string hash, byte[] salt)
        {
            var hashToCompare = Rfc2898DeriveBytes.Pbkdf2(password, salt, iterations, hashAlgorithm, keySize);
            return hashToCompare.SequenceEqual(Convert.FromHexString(hash));
        }

        public async Task CreateUserAsync(UserDto user)
        {
            _context.Add(new User
            {
                Id = Guid.NewGuid(),
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
                Password = HashPasword(user.Password, out var salt),
                Salt = salt
            });
            await _context.SaveChangesAsync();

            // we should now shoot off an email to the client - which would direct them to a register page
        }
    }
}
