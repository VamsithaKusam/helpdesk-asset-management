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
            var tickets = await _ticketService.GetAllTickets();
            return Ok(tickets);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTicket(CreateTicketDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var ticket = await _ticketService.CreateTicket(dto);
            return Ok(ticket);
        }

        [HttpPut("status")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatus(UpdateTicketStatusDTO dto)
        {
            try
            {
                var ticket = await _ticketService.UpdateStatus(dto);
                return Ok(ticket);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}