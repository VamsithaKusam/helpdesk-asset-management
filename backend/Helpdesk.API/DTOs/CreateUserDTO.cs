using System.ComponentModel.DataAnnotations;

namespace Helpdesk.API.DTOs
{
    public class CreateUserDTO
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(4)]
        public string Password { get; set; }= string.Empty;

        [Required]
        public int RoleId { get; set; }
    }
}