using server.Models.Entities;

namespace server.Models
{
    public class SignupDto
    {

        public required string Email { get; set; }

        public required string Password { get; set; }

        public required string UserName { get; set; }
    }
}
