

namespace Cashly.Server.Services.CategoryService;

public class CategoryService : ICategoryService
{
    private readonly DataContext _context;

    public CategoryService(DataContext context)
    {
        _context = context;
    }

    public Task<ServiceResponse<List<Category>>> GetCategories()
    {
        throw new NotImplementedException();
    }
}
