using Cashly.Server.Services.ExpenseService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Cashly.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class expenseConroller : ControllerBase
    {
        private readonly IExpenseService _expenseService;

        public expenseConroller(IExpenseService expenseService)
        {
            _expenseService = expenseService;
        }

        [HttpGet, Authorize]
        public async Task<ActionResult<ServiceResponse<List<Expense>>>> GetExpenses()
        {
            try
            {
                var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
                var response = await _expenseService.GetExpenses(userId);

                if (!response.Success)
                {
                    return BadRequest(response);
                }

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
