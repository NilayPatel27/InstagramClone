namespace server.Models
{
    public class AddPostDto
    {
        public Guid UserId { get; set; }
        public required List<string> Feeds { get; set; }
    }
}
