using Helpdesk.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Helpdesk.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.User)
                .WithMany()
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Restrict);

          
            modelBuilder.Entity<Category>()
                .HasMany(c => c.SubCategories)
                .WithOne(c => c.ParentCategory)
                .HasForeignKey(c => c.ParentCategoryId)
                .OnDelete(DeleteBehavior.Restrict);
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Ticket> Tickets { get; set; }

      
        public DbSet<Category> Categories { get; set; }
        public DbSet<Asset> Assets { get; set; }

        public DbSet<AssetAssignment> AssetAssignments { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }

    }
}