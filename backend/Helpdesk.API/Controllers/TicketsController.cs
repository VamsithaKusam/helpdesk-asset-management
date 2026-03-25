using Microsoft.AspNetCore.Mvc;
using Helpdesk.API.Services;
using Helpdesk.API.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace Helpdesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TicketsController : ControllerBase
    {
        private readonly TicketService _ticketService;

        public TicketsController(TicketService ticketService)
        {
            _ticketService = ticketService;
        }
        [HttpGet]
        public async Task<IActionResult> GetTickets()
        {
            var tickets = await _ticketService.GetTicketsByUser(User);
            return Ok(tickets);
        }
        [HttpPost]
        public async Task<IActionResult> CreateTicket(CreateTicketDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var ticket = await _ticketService.CreateTicket(dto, User);
            return Ok(ticket);
        }

        [HttpPut("status")]
        [Authorize]
        public async Task<IActionResult> UpdateStatus(UpdateTicketStatusDTO dto)
        {
            try
            {
                var ticket = await _ticketService.UpdateStatus(dto, User);
                return Ok(ticket);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("assign")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AssignTicket(AssignTicketDTO dto)
        {
            try
            {
                var ticket = await _ticketService.AssignTicket(dto);
                return Ok(ticket);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}