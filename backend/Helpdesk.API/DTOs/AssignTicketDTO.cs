using System.ComponentModel.DataAnnotations;

public class AssignTicketDTO
{
    [Required]
    public int TicketId { get; set; }

    [Required]
    public int AssignedToUserId { get; set; }
}