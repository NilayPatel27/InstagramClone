﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using server.Models.Entities;

namespace server.Controllers
{
    //localhost:5000/api/users
    [Route("api/[controller]")]
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
            var allUsers = dbContext.Users.ToList();
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
                    user.Name,
                    user.Email,
                    user.UserName,
                    user.ProfileImage,
                    user.Bio,
                    user.Followers,
                    user.Following
                });

            if (user is null) {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateUser(Guid id, UpdateUserDto updateUserDto)
        {
            var user = dbContext.Users.Find(id);
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
    }
}
