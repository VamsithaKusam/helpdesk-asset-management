using Helpdesk.API.Data;
using Helpdesk.API.DTOs;
using Helpdesk.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.Data.SqlClient;


namespace Helpdesk.API.Services
{
    public class TicketService
    {
        private readonly AppDbContext _context;

        public TicketService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TicketDTO>> GetTicketsByUser(ClaimsPrincipal user)
        {
            var email = user.FindFirst(ClaimTypes.Name)?.Value;
            var role = user.FindFirst(ClaimTypes.Role)?.Value;

            if (role == "Admin")
            {
                return await _context.Tickets
                    .Include(t => t.User)
                    .Select(t => new TicketDTO
                    {
                        Id = t.Id,
                        Title = t.Title,
                        Description = t.Description,
                        Status = t.Status,
                        UserName = t.User.Name
                    })
                    .ToListAsync();
            }
            else
            {
                return await _context.Tickets
                    .Include(t => t.User)
                    .Where(t => t.User.Email == email)
                    .Select(t => new TicketDTO
                    {
                        Id = t.Id,
                        Title = t.Title,
                        Description = t.Description,
                        Status = t.Status,
                        UserName = t.User.Name
                    })
                    .ToListAsync();
            }
        }

       
       
    

        public async Task<Ticket> CreateTicket(CreateTicketDTO dto, ClaimsPrincipal user)
            {
                var email = user.FindFirst(ClaimTypes.Name)?.Value;

                var dbUser = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == email);

                if (dbUser == null)
                    throw new Exception("User not found");

                var ticket = new Ticket
                {
                    Title = dto.Title,
                    Description = dto.Description,
                    Status = "Open",
                    CreatedAt = DateTime.Now,
                    UserId = dbUser.Id   
                };

                _context.Tickets.Add(ticket);
                await _context.SaveChangesAsync();

                return ticket;
            }
        

        public async Task<Ticket> UpdateStatus(UpdateTicketStatusDTO dto, ClaimsPrincipal user)
        {
            var ticket = await _context.Tickets.FindAsync(dto.TicketId);

            if (ticket == null)
                throw new Exception("Ticket not found");

            var role = user.FindFirst(ClaimTypes.Role)?.Value;

            // Rule: According to requirements, Admins process tickets via Kanban board
            if (role != "Admin")
                throw new Exception("Only IT Administrators can update ticket statuses.");

            ticket.Status = dto.Status;
            await _context.SaveChangesAsync();

            return ticket;
        }



        // 1. Pagination Stored Procedure Call
        public async Task<List<TicketDTO>> GetAdminTicketsPaged(TicketQueryDTO query)
            {
                var pageNum = new SqlParameter("@PageNumber", query.PageNumber);
                var pageSize = new SqlParameter("@PageSize", query.PageSize);
                var sortCol = new SqlParameter("@SortColumn", query.SortColumn);
                var sortDir = new SqlParameter("@SortDirection", query.SortDirection);

                // Using raw SQL to execute the stored procedure
                var tickets = await _context.Database.SqlQueryRaw<TicketDTO>(
                    "EXEC GetAdminTicketsPaged @PageNumber, @PageSize, @SortColumn, @SortDirection",
                    pageNum, pageSize, sortCol, sortDir).ToListAsync();

                return tickets;
            }

            // 2. Full-Text Search Call
            public async Task<List<TicketDTO>> SearchTickets(string searchTerm)
            {
                var searchParam = new SqlParameter("@SearchTerm", $"\"{searchTerm}*\"");

                // CONTAINS is the SQL keyword for Full-Text Search
                var sql = @"
                SELECT t.Id, t.Title, t.Description, t.Status, u.Name AS UserName
                FROM Tickets t
                INNER JOIN Users u ON t.UserId = u.Id
                WHERE CONTAINS((t.Title, t.Description), @SearchTerm)";

                return await _context.Database.SqlQueryRaw<TicketDTO>(sql, searchParam).ToListAsync();
            }

            // 3. Data Archival Stored Procedure Call
            public async Task<string> ArchiveOldTickets()
            {
                await _context.Database.ExecuteSqlRawAsync("EXEC ArchiveOldResolvedTickets");
                return "Old resolved tickets archived successfully.";
            }

}
}