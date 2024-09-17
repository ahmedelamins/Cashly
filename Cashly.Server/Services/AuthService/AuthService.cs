
using Cashly.Server.Data;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace Cashly.Server.Services.AuthService;

public class AuthService : IAuthService
{
    private readonly DataContext _context;
    private readonly IConfiguration _config;

    public AuthService(DataContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }
    public async Task<ServiceResponse<int>> Register(User user, string password)
    {
        var response = new ServiceResponse<int>();

        try
        {
            if (await UserExists(user.Username))
            {
                response.Success = false;
                response.Message = "Username Already Exists";

                return response;
            }

            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            response.Message = "Registered Successfully!";
            response.Data = user.Id;

        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }

        return response;
    }
    public async Task<ServiceResponse<string>> Login(string username, string password)
    {
        var response = new ServiceResponse<string>();
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower()
            .Equals(username.ToLower()));

            if (user == null)
            {
                response.Success = false;
                response.Message = "User Doesn't Exist";

                return response;
            }
            else if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                response.Success = false;
                response.Message = "Wrong Password";
            }
            else
            {
                response.Data = CreateToken(user);
                response.Message = "Logged in Successfully!";
            }


        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }

        return response;
    }
    public async Task<ServiceResponse<bool>> ChangePassword(int userId, string newPassword)
    {
        var response = new ServiceResponse<bool>();
        try
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                response.Success = false;
                response.Message = "Not Found";

                return response;
            }

            CreatePasswordHash(newPassword, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordSalt = passwordSalt;
            user.PasswordHash = passwordHash;

            await _context.SaveChangesAsync();


            response.Message = "Password Changed Successfully";
            response.Data = true;

        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }

        return response;
    }

    public async Task<ServiceResponse<bool>> DeleteUser(int userId)
    {
        var response = new ServiceResponse<bool>();
        try
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                response.Success = false;
                response.Message = "Not Found";

                return response;
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            response.Message = "Account Deleted Successfuly.";
            response.Data = true;

        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }

        return response;
    }

    public async Task<bool> UserExists(string username)
    {
        if (await _context.Users.AnyAsync(user => user.Username.ToLower()
                 .Equals(username.ToLower())))
        {
            return true;
        }
        return false;
    }

    private void CreatePasswordHash(string passowrd, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passowrd));
        }
    }

    private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512(passwordSalt))
        {
            var computeHash =
                hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            return computeHash.SequenceEqual(passwordHash);
        }
    }

    private string CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username)
        };

        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));


        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken
            (
              claims: claims,
              expires: DateTime.Now.AddDays(1),
              signingCredentials: creds
            );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }
}
