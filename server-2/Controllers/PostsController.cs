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
        public IActionResult GetAllPosts()
        {
            var allPosts = dbContext.Posts.ToList();

            var newPosts = allPosts
                .Select(async post =>
                {
                    var user = await dbContext.Users.FindAsync(post.UserId);
                    return new
                    {
                        post.Id,
                        post.UserId,
                        post.Feeds,
                        post.CreatedAt,
                        UserName = user?.UserName,
                        ProfileImage = user?.ProfileImage
                    };
                }).ToList();
            return Ok(allPosts);
        }
    }
}