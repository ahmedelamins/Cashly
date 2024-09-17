namespace Cashly.Server.Services.ExpenseService;

public class ExpenseService : IExpenseService
{
    private readonly DataContext _context;

    public ExpenseService(DataContext context)
    {
        _context = context;
    }
    public Task<ServiceResponse<Expense>> CreateExpense(int userId, Expense expense)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse<bool>> DeleteExpense(int userId, int expenseId)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse<Expense>> GetExpenseById(int userId, int expenseId)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse<List<Expense>>> GetExpenses(int userId)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse<Expense>> UpdateExpense(int userId, int expenseId, Expense updatedExpense)
    {
        throw new NotImplementedException();
    }
}
