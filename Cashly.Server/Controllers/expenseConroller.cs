using Cashly.Server.Services.ExpenseService;
using Microsoft.AspNetCore.Mvc;

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
    }
}
