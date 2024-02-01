namespace SetBuilder_BE.Models
{
    public class SetHierarchy
    {
        public string SetName { get; set; }
        public List<ClassModel> Class { get; set; }
    }

    public class ClassModel
    {
        public string ClassName { get; set; }
        public int ClassSort { get; set; }
        public List<GroupModel> ProductGroup { get; set; }
    }

    public class GroupModel
    {
        public string ProductGroupName { get; set; }
        public long ProductGroupSort { get; set; }
        public List<string> Sku { get; set; }
    }
}
