using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using server.Data;
using server.Models;
using server.Models.Entities;

namespace server.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public PostsController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("addposts")]
        public async Task<IActionResult> AddPost([FromForm] AddPostDto addPostDto)
        {
            try
            {
                if (!(addPostDto.UserId != Guid.Empty && addPostDto.Feeds != null && addPostDto.Feeds.Count > 0))
                {
                    return BadRequest(new { error = "userId and feeds are required" });
                }

                var newPost = new Post
                {
                    UserId = addPostDto.UserId,
                    Feeds = addPostDto.Feeds
                };

                dbContext.Posts.Add(newPost);
                await dbContext.SaveChangesAsync();

                return Ok(new { message = "Post created successfully", post = newPost });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Internal server error" });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPosts()
        {
            var postsWithUsers = await dbContext.Posts
                .Select(post => new
                {
                    _id = post.Id, // Renamed Id to _id
                    post.UserId,
                    post.Feeds,
                    post.CreatedAt,
                    UserName = dbContext.Users
                        .Where(user => user.Id == post.UserId)
                        .Select(user => user.UserName)
                        .FirstOrDefault(), // Fetch username directly
                    ProfileImage = dbContext.Users
                        .Where(user => user.Id == post.UserId)
                        .Select(user => user.ProfileImage)
                        .FirstOrDefault() // Fetch profile image directly
                })
                .ToListAsync();

            var result = new
            {
                posts = postsWithUsers
            };

            return Ok(result);
        }
    }
}