using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SetBuilderBE.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly DWContext _context;

    public ProductController(DWContext context)
    {
        _context = context;
        _context.Database.SetCommandTimeout(1000);
    }

    // GET: api/Product
    [HttpGet]
    public async Task<ActionResult<IEnumerable<VwMkpProduct>>> GetProducts()
    {
        return await _context.VwMkpProducts.ToListAsync();
    }

    [HttpGet]
    [Route("Filter")]
    public async Task<ActionResult<IEnumerable<string>>> GetProductUPCs(
    [FromQuery] string? department,
    [FromQuery] string? category,
    [FromQuery] string? manufacturer,
    [FromQuery] string? caliber)
    {
        var query = _context.VwMkpProducts.AsQueryable();

        if (!string.IsNullOrEmpty(department))
        {
            query = query.Where(p => p.Department == department);
        }

        if (!string.IsNullOrEmpty(category))
        {
            query = query.Where(p => p.Category == category);
        }

        if (!string.IsNullOrEmpty(manufacturer))
        {
            query = query.Where(p => p.Manufacturer == manufacturer);
        }

        if (!string.IsNullOrEmpty(caliber))
        {
            query = query.Where(p => p.Caliber == caliber);
        }

        var upcs = await query.Select(p => p.Upc).ToListAsync();
        return Ok(upcs);
    }



    // GET: api/Product/GetDistinctDepartments
    [HttpGet("GetDistinctDepartments")]
    public async Task<ActionResult<IEnumerable<string>>> GetDistinctDepartments()
    {
        var departments = await _context.VwMkpProducts
            .Select(p => p.Department)
            .Distinct()
            .ToListAsync();

        return departments;
    }

    // GET: api/Product/GetDistinctCategories
    [HttpGet("GetDistinctCategories")]
    public async Task<ActionResult<IEnumerable<string>>> GetDistinctCategories()
    {
        var categories = await _context.VwMkpProducts
            .Select(p => p.Category)
            .Distinct()
            .ToListAsync();

        return categories;
    }

    // GET: api/Product/GetDistinctUPCs
    [HttpGet("GetDistinctUPCs")]
    public async Task<ActionResult<IEnumerable<string>>> GetDistinctUPCs()
    {
        var upcs = await _context.VwMkpProducts
            .Select(p => p.Upc)
            .Distinct()
            .ToListAsync();

        return upcs;
    }

    // GET: api/Product/GetDistinctProductDescriptions
    [HttpGet("GetDistinctProductDescriptions")]
    public async Task<ActionResult<IEnumerable<string>>> GetDistinctProductDescriptions()
    {
        var productDescriptions = await _context.VwMkpProducts
            .Select(p => p.ProductDescription)
            .Distinct()
            .ToListAsync();

        return productDescriptions;
    }

    // GET: api/Product/GetDistinctCalibers
    [HttpGet("GetDistinctCalibers")]
    public async Task<ActionResult<IEnumerable<string>>> GetDistinctCalibers()
    {
        var calibers = await _context.VwMkpProducts
            .Select(p => p.Caliber)
            .Distinct()
            .ToListAsync();

        return calibers;
    }

    // GET: api/Product/GetDistinctManufacturers
    [HttpGet("GetDistinctManufacturers")]
    public async Task<ActionResult<IEnumerable<string>>> GetDistinctManufacturers()
    {
        var manufacturers = await _context.VwMkpProducts
            .Select(p => p.Manufacturer)
            .Distinct()
            .ToListAsync();

        return manufacturers;
    }
    private bool ProductExists(int id)
    {
        return _context.VwMkpProducts.Any(e => e.DimGfproductId == id);
    }
}
