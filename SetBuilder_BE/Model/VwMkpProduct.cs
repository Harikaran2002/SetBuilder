using System;
using System.Collections.Generic;

namespace SetBuilder_BE.Model
{
    public partial class VwMkpProduct
    {
        public long? DimGfproductId { get; set; }
        public string? Upc { get; set; }
        public string? Department { get; set; }
        public string? Category { get; set; }
        public string? Manufacturer { get; set; }
        public string? ProductDescription { get; set; }
        public string? ManufacturerPartNumber { get; set; }
        public string? Caliber { get; set; }
        public int? LoadDate { get; set; }
        public string? Upc16 { get; set; }
        public int? Upc16keyDimGfproductId { get; set; }
        public int? ProductMasterId { get; set; }
        public string? Brand { get; set; }
        public string Source { get; set; } = null!;
    }
}
