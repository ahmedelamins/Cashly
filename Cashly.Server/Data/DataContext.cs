namespace Cashly.Server.Data;

public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Expense> Expenses { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasMany(u => u.Expenses)
            .WithOne()
            .HasForeignKey(e => e.UserId);

        var random = new Random();
        var expenseData = new List<Expense>();

        var titles = new List<string> { "Groceries", "Electricity Bill", "Internet", "Dining Out", "Fuel", "Shopping", "Gym Membership" };
        var categories = new List<string> { "Utility", "Food", "Fun", "Shopping", "Other" };

        // Generate expenses for the period between September 6 and October 5
        for (var date = new DateOnly(2024, 9, 6); date <= new DateOnly(2024, 10, 5); date = date.AddDays(1))
        {
            var title = titles[random.Next(titles.Count)];
            var category = categories[random.Next(categories.Count)];
            var amount = Math.Round((decimal)(random.NextDouble() * 100), 2);

            expenseData.Add(new Expense
            {
                Id = random.Next(1, 100000),
                Title = title,
                Amount = amount,
                Category = category,
                Date = date,
                UserId = 7 // For user with ID 7
            });
        }

        // Add seed data
        modelBuilder.Entity<Expense>().HasData(expenseData);
    }
}

