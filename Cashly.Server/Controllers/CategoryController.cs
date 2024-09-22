using Cashly.Server.Services.CategoryService;
using Microsoft.AspNetCore.Mvc;

namespace Cashly.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoryController : ControllerBase
{
    private readonly CategoryService _categoryService;

    public CategoryController(CategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<ServiceResponse<Category>>> GetCategories()
    {
        var response = await _categoryService.GetCategories();


        return Ok(response);
    }
}