namespace Helpdesk.API.DTOs
{
    public class TicketDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string Status { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
    }
}