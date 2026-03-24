using Helpdesk.API.Data;
using Helpdesk.API.DTOs;
using Helpdesk.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Helpdesk.API.Services
{
    public class TicketService
    {
        private readonly AppDbContext _context;

        public TicketService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TicketDTO>> GetAllTickets()
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

        public async Task<Ticket> CreateTicket(CreateTicketDTO dto)
        {
            var ticket = new Ticket
            {
                Title = dto.Title,
                Description = dto.Description,
                Status = "Open",
                CreatedAt = DateTime.Now,
                UserId = dto.UserId
            };

            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return ticket;
        }

        public async Task<Ticket> UpdateStatus(UpdateTicketStatusDTO dto)
        {
            var ticket = await _context.Tickets.FindAsync(dto.TicketId);

            if (ticket == null)
                throw new Exception("Ticket not found");

            ticket.Status = dto.Status;

            await _context.SaveChangesAsync();

            return ticket;
        }
    }
}