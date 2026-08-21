using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryAPI.Models
{
    public class Book
    {
        [Key]
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string ISBN { get; set; } = string.Empty;
        public string Publisher { get; set; } = string.Empty;
        public List<Category> Categories { get; set; } = new List<Category>();
        public DateTime PublishedDate { get; set; }
        public DateTime? DueDate { get; set; }
        public int Pages { get; set; }
        public Guid? UserId { get; set;}
        public User? User { get; set; }
        [NotMapped]
        public bool IsAvailable => UserId == null;
    }
}