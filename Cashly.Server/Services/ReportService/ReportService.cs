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
    public async Task<ServiceResponse<decimal>> GetAverageSpendingPerCategory(int userId)
    {
        var response = new ServiceResponse<decimal>();

        try
        {
            var expensesByCategory = await _context.Expenses
                .Where(e => e.UserId == userId)
                .GroupBy(e => e.Category)
                .Select(group => new
                {
                    Category = group.Key,
                    totalAmount = group.Sum(e => e.Amount)
                })
                .ToListAsync();

            if (expensesByCategory.Count > 0)
            {
                var avgSpending = expensesByCategory.Average(e => e.totalAmount);
                response.Data = avgSpending;
            }
            else
            {
                response.Data = 0;
            }


        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }

        return response;
    }

    public async Task<ServiceResponse<string>> GetMosExpensiveCategory(int userId)
    {
        var response = new ServiceResponse<string>();

        try
        {
            var mostExpensive = await _context.Expenses
                .Where(e => e.UserId == userId)
                .GroupBy(e => e.Category)
                .Select(group => new
                {
                    Category = group.Key,
                    TotalAmount = group.Sum(e => e.Amount)
                })
                .OrderByDescending(e => e.TotalAmount)
                .FirstOrDefaultAsync();
            if (mostExpensive != null)
            {
                response.Data = mostExpensive.Category;
            }
            else
            {
                response.Data = "no expenses found";
            }

        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
        }

        return response;
    }
}
