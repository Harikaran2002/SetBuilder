using System;
using System.Collections.Generic;

namespace SetBuilder_BE.Model
{
    public partial class ClxTransaction
    {
        public int Id { get; set; }
        public string? System { get; set; }
        public string? Type { get; set; }
        public string? Item { get; set; }
        public string? Identifier { get; set; }
        public string? Category { get; set; }
        public string? Subcategory { get; set; }
        public string? Manufacturer { get; set; }
        public string? Brand { get; set; }
        public string? Upc { get; set; }
        public string? Description { get; set; }
        public string? Caliber { get; set; }
        public string? Price { get; set; }
        public string? Quantity { get; set; }
        public string? State { get; set; }
        public string? Date { get; set; }
        public DateTime? LoadDate { get; set; }
    }
}
