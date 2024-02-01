using System;
using System.Collections.Generic;

namespace SetBuilderBE.Models
{
    public partial class MkpProductSet
    {
        public int SetId { get; set; }
        public string SetName { get; set; } = null!;
        public string? Department { get; set; }
        public string? Category { get; set; }
        public string? Manufacturer { get; set; }
        public string Caliber { get; set; } = null!;
        public string Upc { get; set; } = null!;
        public string? ProductDescription { get; set; }
    }
}
