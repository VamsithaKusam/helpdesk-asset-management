using System.ComponentModel.DataAnnotations;

namespace Helpdesk.API.DTOs
{
    public class CreateTicketDTO
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

      
    }
}