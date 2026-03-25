using System.ComponentModel.DataAnnotations;

public class AssignTicketDTO
{
    [Required]
    public int TicketId { get; set; }

    [Required]
    public string AssignedToEmail { get; set; } = string.Empty;
}