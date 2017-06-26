using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace vega.Models
{
    [Table("tb_CarModel")]
    public class Model
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        public Make Make { get; set; }
        //An extra column will not be made.
        public int MakeId { get; set; }// Foreign key property. EF will not that this and the line above is related.
    }
}