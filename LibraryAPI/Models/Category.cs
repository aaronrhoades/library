using System.Text.Json.Serialization;

namespace LibraryAPI.Models
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        [JsonIgnore]
        public List<Book> Books { get; set; } = new List<Book>();
    }
}