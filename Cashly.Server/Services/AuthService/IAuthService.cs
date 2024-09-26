namespace Cashly.Server.Services.AuthService;

public interface IAuthService
{
    Task<ServiceResponse<int>> Register(User user, string password);
    Task<ServiceResponse<string>> Login(string username, string password);
    Task<ServiceResponse<bool>> DeleteUser(int userId);
    Task<ServiceResponse<bool>> ChangePassword(int userId, string newPassword);
    Task<ServiceResponse<bool>> ChangeUsername(int userId, string newUsername);
}
