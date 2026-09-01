using Microsoft.EntityFrameworkCore;
using backend_dotnet.Models;

namespace backend_dotnet.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Category> Categories => Set<Category>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "מוצרי חלב" },
            new Category { Id = 2, Name = "מאפים" },
            new Category { Id = 3, Name = "בשר" },
            new Category { Id = 4, Name = "ירקות ופירות" }
        );
    }
}
