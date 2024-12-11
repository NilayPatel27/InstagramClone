namespace server.Models
{
    public class LoginDto
    {
        public required string EmailOrUserName { get; set; }

        public required string Password { get; set; }

    }
}
