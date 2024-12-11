using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using server.Data;
using server.Models;
using server.Models.Entities;

namespace server.Controllers
{
    [Route("api/[controller]")]
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
    }
}
