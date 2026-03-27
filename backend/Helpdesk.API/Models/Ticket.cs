using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Helpdesk.API.Models
{
    public class Ticket
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; } = null!;
        public int? ModifiedByUserId { get; set; }
    }
}