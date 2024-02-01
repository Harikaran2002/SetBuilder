using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SetBuilderBE.Models;

namespace SetBuilderBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UpcController : ControllerBase
    {
        private readonly DWContext _context;

        public UpcController(DWContext context)
        {
            _context = context;
        }

        // GET: api/UpcSet
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UpcSet>>> GetUpcSets()
        {
            return await _context.UpcSets.ToListAsync();
        }

        // POST: api/UpcSet
        [HttpPost]
        public async Task<ActionResult> PostUpcSets([FromBody] List<UpcSet> upcSets)
        {
            try
            {
                foreach (var upcSet in upcSets)
                {
                    var individualUpcSet = new UpcSet
                    {
                        SetName = upcSet.SetName,
                        Upc = upcSet.Upc
                    };

                    _context.UpcSets.Add(individualUpcSet);
                    await _context.SaveChangesAsync();
                }

                return CreatedAtAction(nameof(GetUpcSets), new { id = upcSets.First().SetName }, upcSets);
            }
            catch (Exception ex)
            {
                // Handle exceptions appropriately
                return BadRequest("Error processing the request.");
            }
        }

        private bool UpcSetExists(string setName)
        {
            return _context.UpcSets.Any(e => e.SetName == setName);
        }
    }
}
