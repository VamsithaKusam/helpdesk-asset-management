using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Helpdesk.API.Models
{
    public class AssetAssignment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int AssetId { get; set; }

        [Required]
        public int UserId { get; set; }

        public DateTime AssignedDate { get; set; } = DateTime.Now;

        [ForeignKey("AssetId")]
        public Asset Asset { get; set; } = null!;

        [ForeignKey("UserId")]
        public User User { get; set; } = null!;
    }
}