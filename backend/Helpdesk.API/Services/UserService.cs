using Helpdesk.API.Data;
using Microsoft.EntityFrameworkCore;
using Helpdesk.API.DTOs;
namespace Helpdesk.API.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserDTO>> GetAllUsers()
        {
            return await _context.Users
                .Include(u => u.Role)
                .Select(u => new UserDTO
                {
                   Id= u.Id,
                   Name= u.Name,
                   Email= u.Email,
                   Role = u.Role.Name
                })
                .ToListAsync<UserDTO>();
        }
    }
}