using Helpdesk.API.Data;
using Helpdesk.API.DTOs;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Helpdesk.API.Models;


namespace Helpdesk.API.Services
{
    public class AuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthService(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    public async Task<string?> Login(LoginDTO dto)
    {
        var user = await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Email == dto.Email && u.PasswordHash == dto.Password);

        if (user == null)
            return null;

        return GenerateToken(user);
    }

        private string GenerateToken(User user)
        {
            if (string.IsNullOrEmpty(user.Email))
                throw new Exception("User email is missing");

            if (string.IsNullOrEmpty(user.Role?.Name))
                throw new Exception("User role is missing");

            var claims = new[]
            {
        new Claim(ClaimTypes.Name, user.Email),
        new Claim(ClaimTypes.Role, user.Role.Name)
    };

            var keyString = _config["Jwt:Key"] ?? throw new Exception("JWT Key missing");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

 
}