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
            .WithOne(c => c.Category)
            .HasForeignKey(c => c.CategoryId);

        //seeding some expenses
        //modelBuilder.Entity<Expense>().HasData(

        //     new Expense
        //     {
        //         Id = 1,
        //         Title = "Lunch",
        //         Amount = 12.99m,
        //         CreatedAt = new DateTime(2024, 9, 17, 12, 30, 0),
        //         UserId = 1 // belongs to user 1
        //     },
        //     new Expense
        //     {
        //         Id = 2,
        //         Title = "shopping",
        //         Amount = 99.99m,
        //         CreatedAt = new DateTime(2024, 9, 17, 1, 30, 0),
        //         UserId = 1
        //     },
        //     new Expense
        //     {
        //         Id = 3,
        //         Title = "cinema",
        //         Amount = 5.99m,
        //         CreatedAt = new DateTime(2024, 9, 17, 2, 20, 0),
        //         UserId = 3
        //     },
        //     new Expense
        //     {
        //         Id = 4,
        //         Title = "haircut",
        //         Amount = 24.99m,
        //         CreatedAt = new DateTime(2024, 9, 16, 8, 20, 0),
        //         UserId = 3
        //     }
        //);
    }
}
