using Helpdesk.API.Data;
using Helpdesk.API.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Helpdesk.API.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;

        public AuthService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> ValidateUser(LoginDTO dto)
        {
            return await _context.Users
                .AnyAsync(u => u.Email == dto.Email && u.PasswordHash == dto.Password);
        }
    }
}