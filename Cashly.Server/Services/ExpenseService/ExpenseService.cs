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
                  .Where(e => e.UserId == userId)
                  .OrderByDescending(e => e.CreatedAt) //in order, newest => oldest
                  .ToListAsync();
        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }

        return response;
    }

    public async Task<ServiceResponse<Expense>> GetExpenseById(int userId, int expenseId)
    {
        var response = new ServiceResponse<Expense>();
        try
        {
            var expense = await _context.Expenses
                .FirstOrDefaultAsync(e => e.UserId == userId && e.Id == expenseId); //fetch expense

            if (expense == null)
            {
                response.Success = false;
                response.Message = "Not Found";

                return response;
            }

            response.Data = expense;
        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }

        return response;
    }

    public Task<ServiceResponse<Expense>> CreateExpense(int userId, Expense expense)
    {
        var response = new ServiceResponse<Expense>();
        try
        {


        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }

        return response;
    }

    public Task<ServiceResponse<Expense>> UpdateExpense(int userId, int expenseId, Expense updatedExpense)
    {
        var response = new ServiceResponse<Expense>();
        try
        {


        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }

        return response;
    }

    public Task<ServiceResponse<bool>> DeleteExpense(int userId, int expenseId)
    {
        var response = new ServiceResponse<Expense>();
        try
        {


        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }

        return response;
    }
}
