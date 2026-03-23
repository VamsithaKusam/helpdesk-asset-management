using System.ComponentModel.DataAnnotations;

namespace Helpdesk.API.DTOs
{
    public class CreateTicketDTO
    {
        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public int UserId { get; set; }
    }
}