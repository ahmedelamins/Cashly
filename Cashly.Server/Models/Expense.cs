using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cashly.Server.Models;
public class Expense
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    [Column(TypeName = "decimal(18,2)")]
    public decimal Amount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public int UserId { get; set; }
    [Required]
    public User User { get; set; }
}
