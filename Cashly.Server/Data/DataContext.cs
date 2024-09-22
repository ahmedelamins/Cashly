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
        modelBuilder.Entity<Category>()
            .HasData(
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

    }
}
