using Microsoft.AspNetCore.Mvc;
using Helpdesk.API.Services;
using Helpdesk.API.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace Helpdesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // 1. Everyone logged in can access this controller
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
            // Note: [ApiController] actually does this validation automatically, 
            // but keeping it doesn't hurt!
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var ticket = await _ticketService.CreateTicket(dto, User);
            return Ok(ticket);
        }

        [HttpPut("status")]
        [Authorize(Roles = "Admin")] // 2. ONLY Admins can access this specific method!
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



        [HttpGet("paged")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetPagedTickets([FromQuery] TicketQueryDTO query)
        {
            var tickets = await _ticketService.GetAdminTicketsPaged(query);
            return Ok(tickets);
        }

        [HttpGet("search")]
        [Authorize]
        public async Task<IActionResult> SearchTickets([FromQuery] string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return BadRequest("Search term cannot be empty.");

            var tickets = await _ticketService.SearchTickets(searchTerm);
            return Ok(tickets);
        }

        [HttpPost("archive")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ArchiveTickets()
        {
            var result = await _ticketService.ArchiveOldTickets();
            return Ok(new { message = result });
        }
    }
}