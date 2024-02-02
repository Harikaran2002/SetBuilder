using System;
using System.Collections.Generic;

namespace SetBuilder_BE.Model
{
    public partial class DimMaterial
    {
        public int DimMaterialId { get; set; }
        public string Material { get; set; } = null!;
        public string MaterialDescription { get; set; } = null!;
        public decimal? Price { get; set; }
        public string? ProductHierarchy { get; set; }
        public string? ProductHierarchyL1 { get; set; }
        public string? ProductHierarchyL2 { get; set; }
        public string? ProductHierarchyL3 { get; set; }
        public string? ProductHierarchyDescriptionL1 { get; set; }
        public string? ProductHierarchyDescriptionL2 { get; set; }
        public string? ProductHierarchyDescriptionL3 { get; set; }
        public string? OrderOMeter { get; set; }
        public string? QuarterlyReview { get; set; }
        public string? DistributorInventory { get; set; }
        public string? CustomerPresentations { get; set; }
        public string? CaliberGuage { get; set; }
        public string? Upc { get; set; }
    }
}
