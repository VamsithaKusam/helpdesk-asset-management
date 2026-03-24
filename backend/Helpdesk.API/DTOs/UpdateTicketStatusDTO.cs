using System.ComponentModel.DataAnnotations;

namespace Helpdesk.API.DTOs
{
    public class UpdateTicketStatusDTO
    {
        [Required]
        public int TicketId { get; set; }

        [Required]
        public string Status { get; set; }
    }
}