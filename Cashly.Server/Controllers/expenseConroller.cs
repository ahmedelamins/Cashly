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
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var response = await _expenseService.GetExpenses(userId);

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);

        }

        [HttpGet("{id:int}"), Authorize]
        public async Task<ActionResult<ServiceResponse<Expense>>> GetExpenseById(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var response = await _expenseService.GetExpenseById(userId, id);

            if (!response.Success)
            {
                return NotFound(response);
            }

            return Ok(response);
        }

        [HttpPost, Authorize]
        public async Task<ActionResult<ServiceResponse<Expense>>> CreateExpense([FromBody] Expense expense)
        {
            if (!ModelState.IsValid)
            {
                // Return BadRequest if the model state is invalid
                return BadRequest(new ServiceResponse<Expense>
                {
                    Success = false,
                    Message = "Invalid expense data.",
                    Data = null
                });
            }

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var response = await _expenseService.CreateExpense(userId, expense);

            return Ok(response);
        }

    }
}
