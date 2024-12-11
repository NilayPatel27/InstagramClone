using server.Data;
using server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models.Entities;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IConfiguration configuration;

        public AuthController(ApplicationDbContext dbContext, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            this.configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (string.IsNullOrEmpty(loginDto.EmailOrUserName) || string.IsNullOrEmpty(loginDto.Password))
            {
                return BadRequest(new { error = "Please add email or password" });
            }

            var user = await dbContext.Users
                .Where(u => u.Email == loginDto.EmailOrUserName || u.UserName == loginDto.EmailOrUserName)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return Unauthorized(new { error = "Invalid Email or Password", message = "Invalid Email or Password" });
            }

            bool passwordMatches = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password);

            if (!passwordMatches)
            {
                return Unauthorized(new { error = "Invalid Credentials" });
            }

            var response = new
            {
                user = new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                    user.ProfileImage,
                    user.UserName,
                    user.Bio,
                    user.Followers,
                    user.Following
                },
                message = "Successfully signed in"
            };

            return Ok(response);
        }

         [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupDto signupDto)
        {
            if (string.IsNullOrEmpty(signupDto.Email) || string.IsNullOrEmpty(signupDto.Password) || string.IsNullOrEmpty(signupDto.UserName))
            {
                return BadRequest(new { error = "Please add all the fields" });
            }

            // Hash the password
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(signupDto.Password);

            // Create a new user
            var newUser = new User
            {
                Name = "",
                Email = signupDto.Email,
                Password = hashedPassword,
                ProfileImage = "",
                UserName = signupDto.UserName.ToLower(),
                Bio = "",
                Followers = [],
                Following = []
            };

            try
            {
                dbContext.Users.Add(newUser);
                await dbContext.SaveChangesAsync();

                // Response
                var response = new
                {
                    user = new
                    {
                        newUser.Id,
                        newUser.Name,
                        newUser.Email,
                        newUser.ProfileImage,
                        newUser.UserName,
                        newUser.Bio,
                        newUser.Followers,
                        newUser.Following
                    },
                    message = "Successfully signed up"
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while creating the user", details = ex.Message });
            }
        }

        [HttpPost("usernameexist")]
        public async Task<IActionResult> UsernameExist([FromBody] UsernameExistDto usernameExistDto)
        {
            if (string.IsNullOrEmpty(usernameExistDto.UserName))
            {
                return BadRequest(new { error = "Please add all the fields" });
            }

            var user = await dbContext.Users.FirstOrDefaultAsync(u => u.UserName == usernameExistDto.UserName);

            if (user != null)
            {
                return Ok(new { message = "User already exists with that name" });
            }

            return Ok(new { message = "User not exist" });
        }

        [HttpPost("useremailexist")]
        public async Task<IActionResult> UserEmailExist([FromBody] UserEmailExistDto userEmailExistDto)
        {
            if (string.IsNullOrEmpty(userEmailExistDto.Email))
            {
                return BadRequest(new { error = "Please add all the fields" });
            }

            var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == userEmailExistDto.Email);

            if (user != null)
            {
                return Ok(new { message = "User already exists with that email" });
            }

            return Ok(new { message = "User not exist" });
        }
    }
}
