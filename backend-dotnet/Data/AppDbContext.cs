using Microsoft.EntityFrameworkCore;
using backend_dotnet.Models;

namespace backend_dotnet.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "מוצרי חלב" },
            new Category { Id = 2, Name = "מאפים" },
            new Category { Id = 3, Name = "בשר" },
            new Category { Id = 4, Name = "ירקות ופירות" }
        );

        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "חלב תנובה", CategoryId = 1 },
            new Product { Id = 2, Name = "יוגורט", CategoryId = 1 },
            new Product { Id = 3, Name = "גבינה צהובה", CategoryId = 1 },
            new Product { Id = 4, Name = "גבינה לבנה", CategoryId = 1 },
            new Product { Id = 5, Name = "קרם חמוא", CategoryId = 1 },
            new Product { Id = 6, Name = "בחמיץ", CategoryId = 1 },
            new Product { Id = 7, Name = "לחם קל", CategoryId = 2 },
            new Product { Id = 8, Name = "לחם שיפון", CategoryId = 2 },
            new Product { Id = 9, Name = "ביסקוויט", CategoryId = 2 },
            new Product { Id = 10, Name = "עוגיות שוקולד", CategoryId = 2 },
            new Product { Id = 11, Name = "קרואסאן", CategoryId = 2 },
            new Product { Id = 12, Name = "לחם שחור", CategoryId = 2 },
            new Product { Id = 13, Name = "חזה עוף", CategoryId = 3 },
            new Product { Id = 14, Name = "כבש", CategoryId = 3 },
            new Product { Id = 15, Name = "בקר", CategoryId = 3 },
            new Product { Id = 16, Name = "בשר רוטב", CategoryId = 3 },
            new Product { Id = 17, Name = "קבב", CategoryId = 3 },
            new Product { Id = 18, Name = "מלפפון", CategoryId = 4 },
            new Product { Id = 19, Name = "עגבנייה", CategoryId = 4 },
            new Product { Id = 20, Name = "גזר", CategoryId = 4 },
            new Product { Id = 21, Name = "תפוח עץ", CategoryId = 4 },
            new Product { Id = 22, Name = "בננה", CategoryId = 4 },
            new Product { Id = 23, Name = "תרד", CategoryId = 4 }
        );
    }
}
