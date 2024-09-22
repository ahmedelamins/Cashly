namespace Cashly.Server.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = "General";
    public List<Expense> Expenses { get; set; } = new List<Expense>();
}
