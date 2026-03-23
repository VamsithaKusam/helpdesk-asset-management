using Helpdesk.API.DTOs;
using Helpdesk.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Helpdesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }


       

        [HttpPost]
        public async Task<IActionResult> CreateUser(CreateUserDTO dto)
        {
             var user = await _userService.CreateUser(dto);
             return Ok(user);
        }
}
}