using Helpdesk.API.Data;
using Helpdesk.API.DTOs;
using Helpdesk.API.Models;
using Microsoft.EntityFrameworkCore;

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

       
        public async Task<User> CreateUser(CreateUserDTO dto)
            {
                var user = new User
                {
                    Name = dto.Name,
                    Email = dto.Email,
                    PasswordHash = dto.Password, // later we hash
                    RoleId = dto.RoleId
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return user;
            }
        }
    }