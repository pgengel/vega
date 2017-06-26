using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace vega.Models.Resources
{
    public class PhotoResource
    {
        public int Id {get; set;}
        public string FileName {get; set;}
    }
}