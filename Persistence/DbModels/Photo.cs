using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace vega.Models
{
    [Table("tb_Photo")]
    public class Photo
    {
        public int Id {get; set;}
        [Required]
        [StringLength(255)]
        public string FileName {get; set;}
        public int VehicleId { get; set; }
    }
}