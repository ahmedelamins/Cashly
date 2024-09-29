using System.ComponentModel.DataAnnotations;

namespace Cashly.Server.Models;

public class UserRegister
{
    [Required]
    public string Username { get; set; } = string.Empty;
    [Required]
    public string Password { get; set; } = string.Empty;

}