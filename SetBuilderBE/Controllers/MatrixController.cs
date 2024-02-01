using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SetBuilderBE.Models;
using Microsoft.EntityFrameworkCore;

namespace SetBuilderBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatrixController : ControllerBase
    {
        private readonly DWContext _context;

        public MatrixController(DWContext context)
        {
            _context = context;
            _context.Database.SetCommandTimeout(1000);
        }

        [HttpGet("DistinctDepartments")]
        public async Task<ActionResult<IEnumerable<string>>> GetDistinctDepartments()
        {
            var departments = await _context.VwMkpProducts
                .Select(p => p.Department)
                .Distinct()
                .ToListAsync();

            return departments;
        }

        [HttpGet("SelectedCategory")]
        public async Task<ActionResult<IEnumerable<string>>> GetCategory(
        [FromQuery] string? department)
        {
            var query = _context.VwMkpProducts.AsQueryable();

            if (!string.IsNullOrEmpty(department))
            {
                query = query.Where(p => p.Department == department);
            }

            var categories = await query.Select(p => p.Category).Distinct().ToListAsync();
            return Ok(categories);
        }

        [HttpGet("SelectedManufacturer")]
        public async Task<ActionResult<IEnumerable<string>>> GetManufacturer(
        [FromQuery] string? department,
        [FromQuery] string? category)
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

            var manufacturers = await query.Select(p => p.Manufacturer).Distinct().ToListAsync();
            return Ok(manufacturers);
        }

        [HttpGet("SelectedCaliber")]
        public async Task<ActionResult<IEnumerable<string>>> GetCaliber(
        [FromQuery] string? department,
        [FromQuery] string? category,
        [FromQuery] string? manufacturer)
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

            var calibers = await query.Select(p => p.Caliber).Distinct().ToListAsync();
            return Ok(calibers);
        }

        [HttpGet("SelectedUpc")]
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
    }
}
