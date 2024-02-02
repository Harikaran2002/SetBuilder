using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SetBuilder_BE.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SetBuilder_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SetController : ControllerBase
    {
        private readonly DWContext _context;

        public SetController(DWContext context)
        {
            _context = context;
            _context.Database.SetCommandTimeout(1000);
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SetHierarchy>>> GetProductSetHierarchies()
        {
            var productSets = await _context.ProductSetMasters.ToListAsync();

            if (productSets == null || !productSets.Any())
            {
                return NotFound("No product sets found.");
            }

            var setHierarchies = new List<SetHierarchy>();

            foreach (var productSet in productSets)
            {
                // Check if a set with the same name already exists in the result
                var existingSet = setHierarchies.FirstOrDefault(s => s.SetName == productSet.SetName);

                if (existingSet == null)
                {
                    // If not, create a new set hierarchy
                    var setHierarchy = MapToSetHierarchy(productSet);
                    setHierarchies.Add(setHierarchy);
                }
                else
                {
                    // If yes, check if a class with the same name already exists
                    var existingClass = existingSet.Class.FirstOrDefault(c => c.ClassName == productSet.Class);

                    if (existingClass == null)
                    {
                        // If not, add the class to the existing set hierarchy
                        var classModel = MapToClassModel(productSet);
                        existingSet.Class.Add(classModel);
                    }
                    else
                    {
                        // If yes, check if a product group with the same name already exists
                        var existingGroup = existingClass.ProductGroup.FirstOrDefault(g => g.ProductGroupName == productSet.ProductGroup);

                        if (existingGroup == null)
                        {
                            // If not, add the product group to the existing class
                            var groupModel = MapToGroupModel(productSet);
                            existingClass.ProductGroup.Add(groupModel);
                        }
                        else
                        {
                            // If yes, check if a SKU with the same ID already exists
                            var existingSku = existingGroup.Sku.FirstOrDefault(k => k == productSet.Sku);

                            if (existingSku == null)
                            {
                                // If not, add the SKU to the existing product group
                                existingGroup.Sku.Add(productSet.Sku);
                            }
                        }
                    }
                }
            }

            return Ok(setHierarchies);
        }
        private SetHierarchy MapToSetHierarchy(ProductSetMaster productSet)
        {
            var setHierarchy = new SetHierarchy
            {
                SetName = productSet.SetName,
                Class = new List<ClassModel>
        {
            MapToClassModel(productSet)
        }
            };

            return setHierarchy;
        }

        private ClassModel MapToClassModel(ProductSetMaster productSet)
        {
            var classModel = new ClassModel
            {
                ClassName = productSet.Class,
                ClassSort = productSet.ClassSort ?? 0,
                ProductGroup = new List<GroupModel>
        {
            MapToGroupModel(productSet)
        }
            };

            return classModel;
        }

        private GroupModel MapToGroupModel(ProductSetMaster productSet)
        {
            var groupModel = new GroupModel
            {
                ProductGroupName = productSet.ProductGroup,
                ProductGroupSort = productSet.ProductGroupSort ?? 0,
                Sku = new List<string> { productSet.Sku.ToString() }
            };

            return groupModel;
        }

        [HttpPost]
        public async Task<IActionResult> PostProductSet([FromBody] ProductSetMaster productSet)
        {
            if (productSet == null)
            {
                return BadRequest("Invalid request data");
            }

            try
            {
                // Save the productSet to the database
                _context.ProductSetMasters.Add(productSet);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetProductSet", new { id = productSet.Sku }, productSet);
            }
            catch (Exception ex)
            {
                // Handle exceptions
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
