using System;
using System.Collections.Generic;

namespace SetBuilderBE.Models
{
    public partial class ProductSet
    {
        public int SetId { get; set; }
        public string SetName { get; set; } = null!;
        public string Hierarchy { get; set; } = null!;
    }
}
