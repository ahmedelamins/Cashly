namespace Cashly.Server.Services.ReportService;
public interface IReportService
{
    Task<ServiceResponse<decimal>> GetTotalExpenses(int userId);
    Task<ServiceResponse<decimal>> GetAverageSpendingPerCategory(int userId);
}
