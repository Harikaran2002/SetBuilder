using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SetBuilder_BE.Model
{
    public partial class DWContext : DbContext
    {
        public DWContext()
        {
        }

        public DWContext(DbContextOptions<DWContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ClxTransaction> ClxTransactions { get; set; } = null!;
        public virtual DbSet<DimMaterial> DimMaterials { get; set; } = null!;
        public virtual DbSet<GfProduct> GfProducts { get; set; } = null!;
        public virtual DbSet<ProductMaster> ProductMasters { get; set; } = null!;
        public virtual DbSet<ProductSetMaster> ProductSetMasters { get; set; } = null!;
        public virtual DbSet<VwGfProduct> VwGfProducts { get; set; } = null!;
        public virtual DbSet<VwMkpProduct> VwMkpProducts { get; set; } = null!;
        public virtual DbSet<VwProductMaster> VwProductMasters { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("server=localhost;database=DW;Trusted_connection=true; TrustServerCertificate=true; Encrypt=false");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ClxTransaction>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("CLX_Transactions");

                entity.Property(e => e.Brand)
                    .HasMaxLength(500)
                    .HasColumnName("brand");

                entity.Property(e => e.Caliber)
                    .HasMaxLength(500)
                    .HasColumnName("caliber");

                entity.Property(e => e.Category)
                    .HasMaxLength(500)
                    .HasColumnName("category");

                entity.Property(e => e.Date)
                    .HasMaxLength(50)
                    .HasColumnName("date");

                entity.Property(e => e.Description)
                    .HasMaxLength(500)
                    .HasColumnName("description");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ID");

                entity.Property(e => e.Identifier)
                    .HasMaxLength(500)
                    .HasColumnName("identifier");

                entity.Property(e => e.Item)
                    .HasMaxLength(500)
                    .HasColumnName("item");

                entity.Property(e => e.LoadDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Manufacturer)
                    .HasMaxLength(500)
                    .HasColumnName("manufacturer");

                entity.Property(e => e.Price)
                    .HasMaxLength(50)
                    .HasColumnName("price");

                entity.Property(e => e.Quantity)
                    .HasMaxLength(50)
                    .HasColumnName("quantity");

                entity.Property(e => e.State)
                    .HasMaxLength(50)
                    .HasColumnName("state");

                entity.Property(e => e.Subcategory)
                    .HasMaxLength(500)
                    .HasColumnName("subcategory");

                entity.Property(e => e.System)
                    .HasMaxLength(500)
                    .HasColumnName("system");

                entity.Property(e => e.Type)
                    .HasMaxLength(500)
                    .HasColumnName("type");

                entity.Property(e => e.Upc)
                    .HasMaxLength(500)
                    .HasColumnName("upc");
            });

            modelBuilder.Entity<DimMaterial>(entity =>
            {
                entity.ToTable("DIM_Material");

                entity.Property(e => e.DimMaterialId).HasColumnName("DimMaterialID");

                entity.Property(e => e.CaliberGuage)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Caliber Guage");

                entity.Property(e => e.CustomerPresentations)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Customer Presentations");

                entity.Property(e => e.DistributorInventory)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Distributor Inventory");

                entity.Property(e => e.Material)
                    .HasMaxLength(18)
                    .IsUnicode(false);

                entity.Property(e => e.MaterialDescription)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Material Description");

                entity.Property(e => e.OrderOMeter)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Order O Meter");

                entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.ProductHierarchy)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Product Hierarchy");

                entity.Property(e => e.ProductHierarchyDescriptionL1)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Product Hierarchy Description L1");

                entity.Property(e => e.ProductHierarchyDescriptionL2)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Product Hierarchy Description L2");

                entity.Property(e => e.ProductHierarchyDescriptionL3)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Product Hierarchy Description L3");

                entity.Property(e => e.ProductHierarchyL1)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Product Hierarchy L1");

                entity.Property(e => e.ProductHierarchyL2)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Product Hierarchy L2");

                entity.Property(e => e.ProductHierarchyL3)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Product Hierarchy L3");

                entity.Property(e => e.QuarterlyReview)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Quarterly Review");

                entity.Property(e => e.Upc)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("UPC");
            });

            modelBuilder.Entity<GfProduct>(entity =>
            {
                entity.HasKey(e => e.Upc)
                    .HasName("PK_GearFireProductHierarchy");

                entity.ToTable("GF_Product");

                entity.Property(e => e.Upc)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("UPC");

                entity.Property(e => e.Caliber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Category)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Department)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.GfproductId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("GFProductID");

                entity.Property(e => e.LoadDate).HasDefaultValueSql("(format(getdate(),'yyyMMdd'))");

                entity.Property(e => e.Manufacturer)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.ManufacturerPartNumber)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("Manufacturer Part Number");

                entity.Property(e => e.ProductDescription)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("Product Description");
            });

            modelBuilder.Entity<ProductMaster>(entity =>
            {
                entity.ToTable("ProductMaster");

                entity.Property(e => e.ProductMasterId).HasColumnName("ProductMasterID");

                entity.Property(e => e.AccessoryRail).IsUnicode(false);

                entity.Property(e => e.Action).IsUnicode(false);

                entity.Property(e => e.BarrelLength).IsUnicode(false);

                entity.Property(e => e.BarrelMaterial).IsUnicode(false);

                entity.Property(e => e.BarrelTwist).IsUnicode(false);

                entity.Property(e => e.Caliber).IsUnicode(false);

                entity.Property(e => e.Capacity).IsUnicode(false);

                entity.Property(e => e.Category).IsUnicode(false);

                entity.Property(e => e.ColorFinish).IsUnicode(false);

                entity.Property(e => e.CurrentName)
                    .IsUnicode(false)
                    .HasColumnName("current name");

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.FlatFaceTrigger).IsUnicode(false);

                entity.Property(e => e.Frame).IsUnicode(false);

                entity.Property(e => e.FrontSights).IsUnicode(false);

                entity.Property(e => e.Grip).IsUnicode(false);

                entity.Property(e => e.Grooves)
                    .IsUnicode(false)
                    .HasColumnName("GROOVES");

                entity.Property(e => e.Height).IsUnicode(false);

                entity.Property(e => e.Laser).IsUnicode(false);

                entity.Property(e => e.MaterialofLower).IsUnicode(false);

                entity.Property(e => e.MaterialofUpper).IsUnicode(false);

                entity.Property(e => e.ModelSeries).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);

                entity.Property(e => e.NumberOfMagazines).IsUnicode(false);

                entity.Property(e => e.OpticReady).IsUnicode(false);

                entity.Property(e => e.OverallLengthIn)
                    .IsUnicode(false)
                    .HasColumnName("OverallLength(in)");

                entity.Property(e => e.PerformanceCenter).IsUnicode(false);

                entity.Property(e => e.PortedBarrelSlide)
                    .IsUnicode(false)
                    .HasColumnName("PortedBarrel&Slide");

                entity.Property(e => e.RearSights).IsUnicode(false);

                entity.Property(e => e.Safety).IsUnicode(false);

                entity.Property(e => e.Sights).IsUnicode(false);

                entity.Property(e => e.Size).IsUnicode(false);

                entity.Property(e => e.Sku)
                    .IsUnicode(false)
                    .HasColumnName("SKU");

                entity.Property(e => e.SlideSerrations).IsUnicode(false);

                entity.Property(e => e.StateCompliance).IsUnicode(false);

                entity.Property(e => e.Stock)
                    .IsUnicode(false)
                    .HasColumnName("STOCK");

                entity.Property(e => e.ThreadedBarrel).IsUnicode(false);

                entity.Property(e => e.Upc)
                    .IsUnicode(false)
                    .HasColumnName("UPC");

                entity.Property(e => e.Weight).IsUnicode(false);

                entity.Property(e => e.Width).IsUnicode(false);

                entity.Property(e => e._10lbtrigger)
                    .IsUnicode(false)
                    .HasColumnName("10LBTrigger");
            });

            modelBuilder.Entity<ProductSetMaster>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("ProductSetMaster");

                entity.Property(e => e.BusinessGroup)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Class)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive).HasColumnName("isActive");

                entity.Property(e => e.ProductGroup)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SetName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Sku)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("SKU");
            });

            modelBuilder.Entity<VwGfProduct>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vw_GF_Product");

                entity.Property(e => e.Caliber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Category)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Department)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.DimGfproductId).HasColumnName("DimGFProductID");

                entity.Property(e => e.Manufacturer)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.ManufacturerPartNumber)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("Manufacturer Part Number");

                entity.Property(e => e.ProductDescription)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("Product Description");

                entity.Property(e => e.ProductMasterId).HasColumnName("ProductMasterID");

                entity.Property(e => e.Upc)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("UPC");

                entity.Property(e => e.Upc16)
                    .HasMaxLength(8000)
                    .IsUnicode(false)
                    .HasColumnName("UPC16");

                entity.Property(e => e.Upc16keyDimGfproductId).HasColumnName("UPC16KEY_DimGFProductID");
            });

            modelBuilder.Entity<VwMkpProduct>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vw_MKP_Product");

                entity.Property(e => e.Brand)
                    .HasMaxLength(500)
                    .HasColumnName("brand");

                entity.Property(e => e.Caliber).HasMaxLength(500);

                entity.Property(e => e.Category).HasMaxLength(500);

                entity.Property(e => e.Department).HasMaxLength(500);

                entity.Property(e => e.DimGfproductId).HasColumnName("DimGFProductID");

                entity.Property(e => e.Manufacturer).HasMaxLength(500);

                entity.Property(e => e.ManufacturerPartNumber)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("Manufacturer Part Number");

                entity.Property(e => e.ProductDescription)
                    .HasMaxLength(500)
                    .HasColumnName("Product Description");

                entity.Property(e => e.ProductMasterId).HasColumnName("ProductMasterID");

                entity.Property(e => e.Source)
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Upc)
                    .HasMaxLength(500)
                    .HasColumnName("UPC");

                entity.Property(e => e.Upc16)
                    .HasMaxLength(8000)
                    .IsUnicode(false)
                    .HasColumnName("UPC16");

                entity.Property(e => e.Upc16keyDimGfproductId).HasColumnName("UPC16KEY_DimGFProductID");
            });

            modelBuilder.Entity<VwProductMaster>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vw_ProductMaster");

                entity.Property(e => e.AccessoryRail).IsUnicode(false);

                entity.Property(e => e.Action).IsUnicode(false);

                entity.Property(e => e.BarrelLength).IsUnicode(false);

                entity.Property(e => e.BarrelMaterial).IsUnicode(false);

                entity.Property(e => e.BarrelTwist).IsUnicode(false);

                entity.Property(e => e.Caliber).IsUnicode(false);

                entity.Property(e => e.Capacity).IsUnicode(false);

                entity.Property(e => e.Category).IsUnicode(false);

                entity.Property(e => e.ColorFinish).IsUnicode(false);

                entity.Property(e => e.CurrentName)
                    .IsUnicode(false)
                    .HasColumnName("current name");

                entity.Property(e => e.FlatFaceTrigger).IsUnicode(false);

                entity.Property(e => e.Frame).IsUnicode(false);

                entity.Property(e => e.Height).IsUnicode(false);

                entity.Property(e => e.MaterialofLower).IsUnicode(false);

                entity.Property(e => e.MaterialofUpper).IsUnicode(false);

                entity.Property(e => e.ModelSeries).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);

                entity.Property(e => e.NumberOfMagazines).IsUnicode(false);

                entity.Property(e => e.OpticReady).IsUnicode(false);

                entity.Property(e => e.OverallLengthIn)
                    .IsUnicode(false)
                    .HasColumnName("OverallLength(in)");

                entity.Property(e => e.PerformanceCenter).IsUnicode(false);

                entity.Property(e => e.ProductMasterId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ProductMasterID");

                entity.Property(e => e.Safety).IsUnicode(false);

                entity.Property(e => e.Size).IsUnicode(false);

                entity.Property(e => e.Sku)
                    .IsUnicode(false)
                    .HasColumnName("SKU");

                entity.Property(e => e.SlideSerrations).IsUnicode(false);

                entity.Property(e => e.StateCompliance).IsUnicode(false);

                entity.Property(e => e.ThreadedBarrel).IsUnicode(false);

                entity.Property(e => e.Upc)
                    .IsUnicode(false)
                    .HasColumnName("UPC");

                entity.Property(e => e.Upc16)
                    .IsUnicode(false)
                    .HasColumnName("UPC16");

                entity.Property(e => e.Width).IsUnicode(false);

                entity.Property(e => e._10lbtrigger)
                    .IsUnicode(false)
                    .HasColumnName("10LBTrigger");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
