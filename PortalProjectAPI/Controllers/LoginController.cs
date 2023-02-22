using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PortalProjectAPI.Dtos;
using PortalProjectAPI.Logic;
using PortalProjectAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PortalProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUserLogic _userLogic;
        private readonly JwtHandler _jwtHandler;
        public LoginController(IConfiguration config, IUserLogic userLogic, JwtHandler jwtHandler)
        {
            _config = config;
            _userLogic = userLogic;
            _jwtHandler = jwtHandler;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login(UserForAuthenticationDto userForAuthentication)
        {
            var user = await _userLogic.GetUserByEmail(userForAuthentication.Email);
            if (user == null || !_userLogic.VerifyPassword(userForAuthentication.Password, user.Password, user.Salt))
                return Unauthorized(new AuthResponseDto { ErrorMessage = "Invalid Authentication" });
            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims = _jwtHandler.GetClaims(new IdentityUser() { Email = user.Email, Id = user.Id.ToString() });
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(new AuthResponseDto { IsAuthSuccessful = true, Token = token });
        }

        // To generate token
        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.Email),
                new Claim(ClaimTypes.Role,user.Role)
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        //To authenticate user
        private async Task<User> AuthenticateAsync(UserLogin userLogin)
        {
            var currentUser = await _userLogic.GetUserByEmail(userLogin.Username);
            if (currentUser != null && userLogin.Password == currentUser.Password)
            {
                return currentUser;
            }
            return null;
        }
    }
}
