namespace Cashly.Server.Data;

public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasMany(u => u.Expenses)
            .WithOne(e => e.User)
            .HasForeignKey(e => e.UserId);
    }
    public DbSet<User> Users { get; set; }
    public DbSet<Expense> Expenses { get; set; }
}
