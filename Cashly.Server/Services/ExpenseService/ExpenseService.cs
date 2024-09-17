namespace Cashly.Server.Services.ExpenseService;

public class ExpenseService : IExpenseService
{
    private readonly DataContext _context;

    public ExpenseService(DataContext context)
    {
        _context = context;
    }


    public async Task<ServiceResponse<List<Expense>>> GetExpenses(int userId)
    {
        var response = new ServiceResponse<List<Expense>>();

        try
        {
            response.Data = await _context.Expenses
                .Where(ex => ex.UserId == userId)
                .OrderByDescending(ex => ex.CreatedAt)
                .ToListAsync();

        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }

        return response;
    }

    public Task<ServiceResponse<Expense>> GetExpenseById(int userId, int expenseId)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse<Expense>> CreateExpense(int userId, Expense expense)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse<Expense>> UpdateExpense(int userId, int expenseId, Expense updatedExpense)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse<bool>> DeleteExpense(int userId, int expenseId)
    {
        throw new NotImplementedException();
    }
}
