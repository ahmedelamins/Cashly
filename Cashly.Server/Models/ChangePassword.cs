using System.ComponentModel.DataAnnotations;

namespace Cashly.Server.Models;
public class ChangePassword
{
    [Required, StringLength(20, MinimumLength = 4)]
    public string Password { get; set; } = string.Empty;
}
