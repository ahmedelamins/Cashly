using Cashly.Server.Services.ExpenseService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Cashly.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class expenseController : ControllerBase
{
    private readonly IExpenseService _expenseService;

    public expenseController(IExpenseService expenseService)
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
            // Log the validation errors
            foreach (var modelState in ModelState.Values)
            {
                foreach (var error in modelState.Errors)
                {
                    Console.WriteLine(error.ErrorMessage); // Log errors
                }
            }

            return BadRequest(new ServiceResponse<Expense>
            {
                Success = false,
                Message = "Invalid expense data.",
                Data = null
            });
        }

        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var response = await _expenseService.CreateExpense(userId, expense);

        if (!response.Success)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }

    [HttpPut("{id:int}"), Authorize]
    public async Task<ActionResult<ServiceResponse<Expense>>> UpdateExpense(int Id, [FromBody] Expense UpdatedExpense)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var response = await _expenseService.UpdateExpense(userId, Id, UpdatedExpense);

        return Ok(response);
    }

    [HttpDelete("{id:int}"), Authorize]
    public async Task<ActionResult<ServiceResponse<bool>>> DeleteExpense(int id)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var response = await _expenseService.DeleteExpense(userId, id);

        if (!response.Success)
        {
            return NotFound(response);
        }

        return Ok(response);
    }

}
