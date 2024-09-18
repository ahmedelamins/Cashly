using System.ComponentModel.DataAnnotations;

namespace Cashly.Server.Models;

public class UserRegister
{
    [Required]
    public string Username { get; set; } = string.Empty;
    [Required, StringLength(20, MinimumLength = 4)]
    public string Password { get; set; } = string.Empty;

}