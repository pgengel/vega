namespace vega.Models
{
    public class VehicleQuery
    {
        public int? MakeId {get; set; }
        public int? ModelId {get; set; }

        public string SortBy { get; set;}
        public string IsSortAscending { get; set;}
    }
}