using System.ComponentModel.DataAnnotations;

namespace Helpdesk.API.DTOs
{
    public class AssignAssetDTO
    {
        [Required]
        public string AssetTag { get; set; } = string.Empty;

        [Required]
        public int UserId { get; set; }
    }
}