namespace Cashly.Server.Services.ReportService;

public class ReportService : IReportService
{
    private readonly DataContext _context;

    public ReportService(DataContext context)
    {
        _context = context;
    }
    public async Task<ServiceResponse<decimal>> GetTotalExpenses(int userId, DateOnly? startDate = null, DateOnly? endDate = null)
    {
        var response = new ServiceResponse<decimal>();

        try
        {
            var totalExpenses = await _context.Expenses
                .Where(e => e.UserId == userId &&
                                 (!startDate.HasValue || e.Date >= startDate.Value) &&
                                 (!endDate.HasValue || e.Date <= endDate.Value))
                .SumAsync(e => e.Amount);

            response.Data = totalExpenses;

        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }

        return response;
    }
    public async Task<ServiceResponse<Dictionary<string, decimal>>> GetExpensesByCategory(int userId, DateOnly? startDate = null, DateOnly? endDate = null)
    {
        var response = new ServiceResponse<Dictionary<string, decimal>>();

        try
        {
            var expenseByCategory = await _context.Expenses
                .Where(e => e.UserId == userId &&
                                 (!startDate.HasValue || e.Date >= startDate.Value) &&
                                 (!endDate.HasValue || e.Date <= endDate.Value))
                .GroupBy(e => e.Category)
                .Select(g => new
                {
                    Category = g.Key,
                    TotalAmount = g.Sum(e => e.Amount)
                })
               .ToDictionaryAsync(g => g.Category, g => g.TotalAmount);

            response.Data = expenseByCategory;
        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }

        return response;
    }

}
