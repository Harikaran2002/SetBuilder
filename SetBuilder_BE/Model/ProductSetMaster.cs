using System;
using System.Collections.Generic;

namespace SetBuilder_BE.Model
{
    public partial class ProductSetMaster
    {
        public string BusinessGroup { get; set; } = null!;
        public string SetName { get; set; } = null!;
        public int? ClassSort { get; set; }
        public long? ProductGroupSort { get; set; }
        public string? Class { get; set; }
        public string? ProductGroup { get; set; }
        public string? Sku { get; set; }
        public int? IsActive { get; set; }
    }
}
