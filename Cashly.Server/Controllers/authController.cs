using Cashly.Server.Services.AuthService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Cashly.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class authController : ControllerBase
{
    private readonly IAuthService _authService;

    public authController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<ServiceResponse<int>>> Register(UserRegister request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var response = await _authService
            .Register(
                new User
                {
                    Username = request.Username
                },
                request.Password
            );

        if (!response.Success)
        {
            return BadRequest(response.Message);
        }

        return Ok(response);
    }

    [HttpPost("login")]
    public async Task<ActionResult<ServiceResponse<string>>> Login(UserLogin request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var response = await _authService.Login(request.Username, request.Password);

        if (!response.Success)
        {
            return BadRequest(response.Message);
        }

        return Ok(response);
    }

    [HttpPost("change-password"), Authorize]
    public async Task<ActionResult<ServiceResponse<bool>>> ChangePassword([FromBody] ChangePassword request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("User ID Not Found.");
        }

        var response = await _authService.ChangePassword(int.Parse(userId), request.Password);
        if (!response.Success)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }


    [HttpDelete("delete-user/{userId:int}"), Authorize]
    public async Task<ActionResult<ServiceResponse<bool>>> DeleteUser(int userId)
    {
        var response = await _authService.DeleteUser(userId);

        if (!response.Success)
        {
            return BadRequest(response.Message);
        }

        return Ok(response);
    }

}
