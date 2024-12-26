namespace server.Models
{
    public class UpdateUserDto
    {
        public string? Name { get; set; }

        public string? ProfileImage { get; set; }

        public string? Bio { get; set; }

        public Guid UserId { get; set; }

    }
}
