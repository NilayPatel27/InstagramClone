﻿using System;
using System.Collections.Generic;

namespace server.Models.Entities
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string? Name { get; set; }

        public required string Email { get; set; }

        public required string Password { get; set; }

        public string? ProfileImage { get; set; }

        public required string UserName { get; set; }

        public string? Bio { get; set; }

        public ICollection<Guid> Followers { get; set; } = new List<Guid>();
        public ICollection<Guid> Following { get; set; } = new List<Guid>();
    }
}
