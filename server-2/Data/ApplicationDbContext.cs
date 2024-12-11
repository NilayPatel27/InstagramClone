using Microsoft.EntityFrameworkCore;
using server.Models.Entities;

namespace server.Data
{
    public class ApplicationDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(u => u.Followers)
                .HasConversion(
                    v => string.Join(',', v), // Serialize to string
                    v => string.IsNullOrEmpty(v) ? new List<Guid>() : v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(Guid.Parse).ToList());

            modelBuilder.Entity<User>()
                .Property(u => u.Following)
                .HasConversion(
                    v => string.Join(',', v),
                    v => string.IsNullOrEmpty(v) ? new List<Guid>() : v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(Guid.Parse).ToList());
        }

        public DbSet<User> Users { get; set; } = null!;

        public DbSet<Post> Posts { get; set; } = null!;
    }
}
