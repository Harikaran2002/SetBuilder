using System;
using System.Collections.Generic;

namespace SetBuilderBE.Models
{
    public partial class UpcSet
    {
        public int RecordId { get; set; }
        public string SetName { get; set; } = null!;
        public string Upc { get; set; } = null!;
    }
}
