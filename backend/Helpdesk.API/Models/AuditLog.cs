using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Helpdesk.API.Models
{
    public class AuditLog
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int TicketId { get; set; }

        public string? OldStatus { get; set; }

        [Required]
        public string NewStatus { get; set; } = string.Empty;

        [Required]
        public int ChangedByUserId { get; set; }

        public DateTime Timestamp { get; set; } = DateTime.Now;

        [ForeignKey("TicketId")]
        public Ticket Ticket { get; set; } = null!;

        [ForeignKey("ChangedByUserId")]
        public User ChangedByUser { get; set; } = null!;
    }
}