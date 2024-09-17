namespace Cashly.Server.Services.ExpenseService;

public interface IExpenseService
{
    Task<ServiceResponse<List<Expense>>> GetExpenses(int userId);
    Task<ServiceResponse<Expense>> GetExpenseById(int userId, int expenseId);
    Task<ServiceResponse<Expense>> CreateExpense(int userId, Expense expense);
    Task<ServiceResponse<Expense>> UpdateExpense(int userId, int expenseId, Expense updatedExpense);
    Task<ServiceResponse<bool>> DeleteExpense(int userId, int expenseId);
}
