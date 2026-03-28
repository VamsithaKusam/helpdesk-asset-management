namespace Helpdesk.API.DTOs
{
    public class TicketQueryDTO
    {
        public string? SearchTerm { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string SortColumn { get; set; } = "CreatedAt";
        public string SortDirection { get; set; } = "DESC";
    }
}