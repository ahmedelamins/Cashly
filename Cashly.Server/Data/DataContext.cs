namespace Cashly.Server.Data;

public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
}
