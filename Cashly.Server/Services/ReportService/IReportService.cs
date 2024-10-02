namespace Cashly.Server.Services.ReportService;
public interface IReportService
{
    Task<ServiceResponse<decimal>> GetTotalExpenses(int userId);
    Task<ServiceResponse<decimal>> GetAverageSpendingPerCategory(int userId);
    Task<ServiceResponse<string>> GetMosExpensiveCategory(int userId);
    Task<ServiceResponse<List<decimal>>> GetWeeklyExpenses(int userId);
}
