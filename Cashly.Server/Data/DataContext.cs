namespace Cashly.Server.Data;

public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Expense> Expenses { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasMany(u => u.Expenses)
            .WithOne(e => e.User)
            .HasForeignKey(e => e.UserId);

        modelBuilder.Entity<Category>()
            .HasMany(c => c.Expenses)
            .WithOne(e => e.Category)
            .HasForeignKey(e => e.CategoryId);

        //seeding categories
        modelBuilder.Entity<Category>().HasData
            (
                new Category
                {
                    Id = 1,
                    Name = "Utility"
                },
                new Category
                {
                    Id = 2,
                    Name = "Food"
                },
                new Category
                {
                    Id = 3,
                    Name = "Fun"
                },
                new Category
                {
                    Id = 4,
                    Name = "Shopping"
                },
                new Category
                {
                    Id = 5,
                    Name = "Other"
                }
            );

        //seeding expenses
        modelBuilder.Entity<Expense>().HasData
            (
                new Expense
                {
                    Id = 1,
                    Title = "Rent",
                    Amount = 1200.00m,
                    CategoryId = 1, //utility
                    UserId = 1,
                    CreatedAt = new DateTime(2024, 9, 3)
                },
                new Expense
                {
                    Id = 2,
                    Title = "Electric Bill",
                    Amount = 120.50m,
                    CategoryId = 1, //utility
                    UserId = 1,
                    CreatedAt = new DateTime(2023, 9, 1)
                },
                new Expense
                {
                    Id = 3,
                    Title = "Groceries",
                    Amount = 80.99m,
                    CategoryId = 2, // Food
                    UserId = 1,
                    CreatedAt = new DateTime(2023, 9, 7)
                },
                new Expense
                {
                    Id = 4,
                    Title = "Lunch",
                    Amount = 24.57m,
                    CategoryId = 2, // Food
                    UserId = 1,
                    CreatedAt = new DateTime(2023, 9, 8)
                },
                new Expense
                {
                    Id = 5,
                    Title = "New Shoes",
                    Amount = 70.00m,
                    CategoryId = 4, // Shopping 
                    UserId = 1,
                    CreatedAt = new DateTime(2023, 9, 10)
                },
                new Expense
                {
                    Id = 6,
                    Title = "Concert Ticket",
                    Amount = 45.00m,
                    CategoryId = 3, // Fun
                    UserId = 1,
                    CreatedAt = new DateTime(2023, 8, 11)
                },
                new Expense
                {
                    Id = 7,
                    Title = "Charity",
                    Amount = 25.75m,
                    CategoryId = 5, // Other
                    UserId = 1,
                    CreatedAt = new DateTime(2023, 9, 10)
                },
                new Expense
                {
                    Id = 8,
                    Title = "Fix phone",
                    Amount = 45.00m,
                    CategoryId = 5, // other
                    UserId = 1,
                    CreatedAt = new DateTime(2023, 8, 22)
                }
            );

    }
}
