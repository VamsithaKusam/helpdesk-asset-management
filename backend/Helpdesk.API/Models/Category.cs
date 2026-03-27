using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Helpdesk.API.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        public int? ParentCategoryId { get; set; }

        [ForeignKey("ParentCategoryId")]
        [JsonIgnore] // Prevents infinite loops when serializing JSON
        public Category? ParentCategory { get; set; }

        public ICollection<Category> SubCategories { get; set; } = new List<Category>();
        public ICollection<Asset> Assets { get; set; } = new List<Asset>();
    }
}