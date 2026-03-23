using System.ComponentModel.DataAnnotations;

namespace Helpdesk.API.DTOs
{
    public class CreateUserDTO
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(4)]
        public string Password { get; set; }

        [Required]
        public int RoleId { get; set; }
    }
}