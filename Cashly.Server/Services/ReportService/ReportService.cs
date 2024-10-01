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
                .Where(e => e.UserId == userId)
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
    public Task<ServiceResponse<Dictionary<string, decimal>>> GetExpensesByCategory(int userId, DateOnly? startDate = null, DateOnly? endDate = null)
    {
        throw new NotImplementedException();
    }

}
