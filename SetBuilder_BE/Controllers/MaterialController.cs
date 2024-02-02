using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SetBuilder_BE.Model;

namespace SetBuilder_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private readonly DWContext _context;

        public MaterialController(DWContext context)
        {
            _context = context;
            _context.Database.SetCommandTimeout(1000);
        }

        [HttpGet("DistinctLevel1")]
        public async Task<ActionResult<IEnumerable<string>>> GetDistinctLevel1()
        {
            var level1s = await _context.DimMaterials
                .Select(p => p.ProductHierarchyDescriptionL1)
                .Distinct()
                .ToListAsync();

            return level1s;
        }

        [HttpGet("SelectedLevel2")]
        public async Task<ActionResult<IEnumerable<string>>> GetLevel2(
        [FromQuery] string? level1)
        {
            var query = _context.DimMaterials.AsQueryable();

            if (!string.IsNullOrEmpty(level1))
            {
                query = query.Where(p => p.ProductHierarchyDescriptionL1 == level1);
            }

            var level2s = await query.Select(p => p.ProductHierarchyDescriptionL2).Distinct().ToListAsync();
            return Ok(level2s);
        }

        [HttpGet("SelectedLevel3")]
        public async Task<ActionResult<IEnumerable<string>>> GetLevel3(
       [FromQuery] string? level1,
       [FromQuery] string? level2)
        {
            var query = _context.DimMaterials.AsQueryable();

            if (!string.IsNullOrEmpty(level1))
            {
                query = query.Where(p => p.ProductHierarchyDescriptionL1 == level1);
            }

            if (!string.IsNullOrEmpty(level2))
            {
                query = query.Where(p => p.ProductHierarchyDescriptionL2 == level2);
            }

            var level3s = await query.Select(p => p.ProductHierarchyDescriptionL3).Distinct().ToListAsync();
            return Ok(level3s);
        }

        [HttpGet("SelectedUpc")]
        public async Task<ActionResult<IEnumerable<string>>> GetUpc(
       [FromQuery] string? level1,
       [FromQuery] string? level2,
       [FromQuery] string? level3)
        {
            var query = _context.DimMaterials.AsQueryable();

            if (!string.IsNullOrEmpty(level1))
            {
                query = query.Where(p => p.ProductHierarchyDescriptionL1 == level1);
            }

            if (!string.IsNullOrEmpty(level2))
            {
                query = query.Where(p => p.ProductHierarchyDescriptionL2 == level2);
            }

            if (!string.IsNullOrEmpty(level3))
            {
                query = query.Where(p => p.ProductHierarchyDescriptionL3 == level3);
            }

            var upcs = await query.Select(p => p.Upc).Distinct().ToListAsync();
            return Ok(upcs);
        }
    }
}
