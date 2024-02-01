using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SetBuilderBE.Models;

namespace SetBuilderBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HierarchyController : ControllerBase
    {
        private readonly DWContext _context;

        public HierarchyController(DWContext context)
        {
            _context = context;
        }

        // GET: api/Hierarchy
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductSet>>> GetProductSets()
        {
            return await _context.ProductSets.ToListAsync();
        }

        // GET: api/Hierarchy/1
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductSet>> GetProductSet(int id)
        {
            var productSet = await _context.ProductSets.FindAsync(id);

            if (productSet == null)
            {
                return NotFound();
            }

            return productSet;
        }

        // POST: api/Hierarchy
        [HttpPost]
        public async Task<ActionResult<ProductSet>> PostProductSet(ProductSet productSet)
        {
            _context.ProductSets.Add(productSet);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProductSet), new { id = productSet.SetId }, productSet);
        }

        // PUT: api/Hierarchy/1
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductSet(int id, ProductSet productSet)
        {
            if (id != productSet.SetId)
            {
                return BadRequest();
            }

            _context.Entry(productSet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductSetExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Hierarchy/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductSet(int id)
        {
            var productSet = await _context.ProductSets.FindAsync(id);

            if (productSet == null)
            {
                return NotFound();
            }

            _context.ProductSets.Remove(productSet);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductSetExists(int id)
        {
            return _context.ProductSets.Any(e => e.SetId == id);
        }
    }
}
