using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Helpdesk.API.Models
{
    public class Asset
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string AssetTag { get; set; } = string.Empty; // e.g., "MAC-001"

        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "Available"; // Available or Assigned

        [Required]
        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public Category Category { get; set; } = null!;
    }
}