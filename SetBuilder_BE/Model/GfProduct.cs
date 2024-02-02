using System;
using System.Collections.Generic;

namespace SetBuilder_BE.Model
{
    public partial class GfProduct
    {
        public int GfproductId { get; set; }
        public string Upc { get; set; } = null!;
        public int LoadDate { get; set; }
        public string? Department { get; set; }
        public string? Category { get; set; }
        public string? Manufacturer { get; set; }
        public string? ProductDescription { get; set; }
        public string? ManufacturerPartNumber { get; set; }
        public string Caliber { get; set; } = null!;
    }
}
