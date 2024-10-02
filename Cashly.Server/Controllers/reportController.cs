using Cashly.Server.Services.ReportService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cashly.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class reportController : ControllerBase
{
    private readonly IReportService _reportService;

    public reportController(IReportService reportService)
    {
        _reportService = reportService;
    }

    [HttpGet("total-expenses"), Authorize]
    public async Task<ActionResult<ServiceResponse<decimal>>> GetTotalExpenses(int userId)
    {
        var response = await _reportService.GetTotalExpenses(userId);

        if (!response.Success)
        {
            return BadRequest(response);
        }
        return Ok(response);
    }

    [HttpGet("average-expenses"), Authorize]
    public async Task<ActionResult<ServiceResponse<decimal>>> GetAverageSpendingPerCategory(int userId)
    {
        var response = await _reportService.GetAverageSpendingPerCategory(userId);

        if (!response.Success)
        {
            return BadRequest(response);
        }
        return Ok(response);
    }

    [HttpGet("most-expensive"), Authorize]
    public async Task<ActionResult<ServiceResponse<decimal>>> GetMosExpensiveCategory(int userId)
    {
        var response = await _reportService.GetMosExpensiveCategory(userId);

        if (!response.Success)
        {
            return BadRequest(response);
        }
        return Ok(response);
    }
}
