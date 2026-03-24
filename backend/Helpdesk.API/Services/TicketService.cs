using Helpdesk.API.Data;
using Helpdesk.API.DTOs;
using Helpdesk.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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