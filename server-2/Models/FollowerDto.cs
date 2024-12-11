namespace server.Models
{
    public class FollowerDto
    {
        public required Guid UserId { get; set; }
        public required Guid FollowId { get; set; }
    }
}
