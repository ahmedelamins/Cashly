using Cashly.Server.Services.CategoryService;
using Microsoft.AspNetCore.Mvc;

namespace Cashly.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class categoryController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public categoryController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<ServiceResponse<List<Category>>>> GetCategories()
    {
        var response = await _categoryService.GetCategories();

        return Ok(response);
    }
}
