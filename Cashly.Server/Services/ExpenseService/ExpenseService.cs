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
                  .OrderByDescending(e => e.Id) //in order, newest => oldest
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

    public async Task<ServiceResponse<Expense>> CreateExpense(int userId, Expense expense)
    {
        var response = new ServiceResponse<Expense>();

        try
        {

            expense.UserId = userId;

            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();

            response.Data = expense;
            response.Message = "New expense added!";

        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }

        return response;
    }

    public async Task<ServiceResponse<Expense>> UpdateExpense(int userId, int expenseId, Expense updatedExpense)
    {
        var response = new ServiceResponse<Expense>();
        try
        {
            //fetch expense
            var expense = await _context.Expenses
                .FirstOrDefaultAsync(e => e.UserId == userId && e.Id == expenseId);

            if (expense == null)
            {
                response.Success = false;
                response.Message = "Not Found!";

                return response;
            }

            expense.Title = updatedExpense.Title;
            expense.Amount = updatedExpense.Amount;
            expense.Date = updatedExpense.Date;
            expense.Category = updatedExpense.Category;

            await _context.SaveChangesAsync();

            response.Data = expense;
            response.Message = "Expense updated";
        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }

        return response;
    }

    public async Task<ServiceResponse<bool>> DeleteExpense(int userId, int expenseId)
    {
        var response = new ServiceResponse<bool>();
        try
        {
            var expense = await _context.Expenses
                .FirstOrDefaultAsync(e => e.UserId == userId && e.Id == expenseId); //fetch

            if (expense == null)
            {
                response.Success = false;
                response.Message = "Not Found";

                return response;
            }

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();

            response.Data = true;
            response.Message = "Expense deleted.";
        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }

        return response;
    }
}
