using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SetBuilderBE.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class SetController : ControllerBase
{
    private readonly DWContext _context;

    public SetController(DWContext context)
    {
        _context = context;
    }

    // GET: api/Set
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MkpProductSet>>> GetSets()
    {
        return await _context.MkpProductSets.ToListAsync();
    }

    // GET: api/Set/name
    [HttpGet("{name}")]
    public async Task<ActionResult<MkpProductSet>> GetSet(string name)
    {
        var set = await _context.MkpProductSets.FindAsync(name);

        if (set == null)
        {
            return NotFound();
        }

        return set;
    }

    // POST: api/Set
    [HttpPost]
    public async Task<ActionResult<IEnumerable<MkpProductSet>>> PostSets(IEnumerable<MkpProductSet> sets)
    {
        _context.MkpProductSets.AddRange(sets);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSets), sets);
    }


    // PUT: api/Set/setName
    [HttpPut("{setName}")]
    public async Task<IActionResult> PutSet(string setName, MkpProductSet set)
    {
        if (setName != set.SetName)
        {
            return BadRequest();
        }

        _context.Entry(set).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!SetExists(setName))
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

    // DELETE: api/Set/setName
    [HttpDelete("{setName}")]
    public async Task<IActionResult> DeleteSet(string setName)
    {
        var set = await _context.MkpProductSets.FirstOrDefaultAsync(s => s.SetName == setName);

        if (set == null)
        {
            return NotFound();
        }

        _context.MkpProductSets.Remove(set);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool SetExists(string setName)
    {
        return _context.MkpProductSets.Any(e => e.SetName == setName);
    }

}
