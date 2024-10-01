namespace Cashly.Server.Services.ReportService;

public class ReportService : IReportService
{
    private readonly DataContext _context;

    public ReportService(DataContext context)
    {
        _context = context;
    }
    public async Task<ServiceResponse<decimal>> GetTotalExpenses(int userId)
    {
        var response = new ServiceResponse<decimal>();

        try
        {
            var totalExpenses = await _context.Expenses
                .Where(e => e.UserId == userId)
                .SumAsync(e => e.Amount);

            response.Data = totalExpenses;
            response.Message = totalExpenses == 0 ? "No expenses found." : "";
        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }

        return response;
    }
    public async Task<ServiceResponse<Dictionary<string, decimal>>> GetExpensesByCategory(int userId)
    {
        var response = new ServiceResponse<Dictionary<string, decimal>>();

        try
        {
            var expensesByCategory = await _context.Expenses
                .Where(e => e.UserId == userId)
                .GroupBy(e => e.Category)
                .Select(g => new
                {
                    Category = g.Key,
                    TotalAmount = g.Sum(e => e.Amount)
                })
               .ToDictionaryAsync(g => g.Category, g => g.TotalAmount);

            response.Data = expensesByCategory;
            response.Message = expensesByCategory.Count < 1 ? "No expenses found." : "";
        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }

        return response;
    }

}
