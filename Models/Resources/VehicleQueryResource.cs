namespace vega.Models.Resources
{
    public class VehicleQeuryResource
    {
        public int? MakeId {get; set; }
        public int? ModelId {get; set; }
        public string SortBy { get; set;}
        public string IsSortAscending { get; set;}
    }
}