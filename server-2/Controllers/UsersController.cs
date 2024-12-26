using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.Entities;
using System.Linq;

namespace server.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public UsersController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var allUsers = dbContext.Users
            .Select(user => new
            {
                _id = user.Id,
                user.Name,
                user.Email,
                user.ProfileImage,
                user.UserName,
                user.Bio,
                user.Followers,
                user.Following
            })
            .ToList();

            return Ok(allUsers);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetUserById(Guid id)
        {
            var user = dbContext.Users.
                Where(user => user.Id == id)
                .Select(user => new
                {
                    _id = user.Id,
                    user.Name,
                    user.Email,
                    user.UserName,
                    user.ProfileImage,
                    user.Bio,
                    user.Followers,
                    user.Following
                }).FirstOrDefault();

            if (user is null) {
                return NotFound();
            }

            var response = new
            {
                user
            };

            return Ok(response);
        }

        [HttpPut]
        public IActionResult UpdateUser([FromForm] UpdateUserDto updateUserDto)
        {
            var user = dbContext.Users.Find(updateUserDto.UserId);
            if (user is null)
            {
                return NotFound();
            }
            user.Name = updateUserDto.Name;
            user.ProfileImage = updateUserDto.ProfileImage;
            user.Bio = updateUserDto.Bio;
            dbContext.SaveChanges();
            return Ok(user);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteUser(Guid id)
        {
            var user = dbContext.Users.Find(id);
            if (user is null)
            {
                return NotFound();
            }
            dbContext.Users.Remove(user);
            dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("follow")]
        public async Task<IActionResult> FollowUser([FromBody] FollowerDto followerDto)
        {
            if (followerDto == null || followerDto.UserId == Guid.Empty || followerDto.FollowId == Guid.Empty)
            {
                return BadRequest(new { error = "Invalid request" });
            }

            var followUser = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == followerDto.FollowId);
            if (followUser == null)
            {
                return NotFound(new { error = "User to follow not found" });
            }

            var currentUser = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == followerDto.UserId);
            if (currentUser == null)
            {
                return NotFound(new { error = "Current user not found" });
            }

            if (!followUser.Followers.Contains(currentUser.Id))
            {
                followUser.Followers.Add(currentUser.Id);
                dbContext.Entry(followUser).Property(u => u.Followers).IsModified = true;
            }

            if (!currentUser.Following.Contains(followUser.Id))
            {
                currentUser.Following.Add(followUser.Id);
                dbContext.Entry(currentUser).Property(u => u.Following).IsModified = true;
            }

            await dbContext.SaveChangesAsync();

            return Ok(new
            {
                message = "Followed successfully"
            });
        }

        [HttpPut("unfollow")]
        public async Task<IActionResult> UnfollowUser([FromBody] FollowerDto followerDto)
        {
            if (followerDto == null || followerDto.UserId == Guid.Empty || followerDto.FollowId == Guid.Empty)
            {
                return BadRequest(new { error = "Invalid request" });
            }

            var followUser = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == followerDto.FollowId);
            if (followUser == null)
            {
                return NotFound(new { error = "User to follow not found" });
            }

            var currentUser = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == followerDto.UserId);
            if (currentUser == null)
            {
                return NotFound(new { error = "Current user not found" });
            }

            if (followUser.Followers.Contains(currentUser.Id))
            {
                followUser.Followers.Remove(currentUser.Id);
                dbContext.Entry(followUser).Property(u => u.Followers).IsModified = true;
            }

            if (currentUser.Following.Contains(followUser.Id))
            {
                currentUser.Following.Remove(followUser.Id);
                dbContext.Entry(currentUser).Property(u => u.Following).IsModified = true;
            }

            await dbContext.SaveChangesAsync();

            return Ok(new
            {
                message = "Unfollowed successfully"
            });
        }
    }
}
