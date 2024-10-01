namespace Cashly.Server.Services.ReportService;
public interface IReportService
{
    Task<ServiceResponse<decimal>> GetTotalExpenses(int userId, DateOnly? startDate = null, DateOnly? endDate = null);
    Task<ServiceResponse<Dictionary<string, decimal>>> GetExpensesByCategory(int userId, DateOnly? startDate = null, DateOnly? endDate = null);
}
