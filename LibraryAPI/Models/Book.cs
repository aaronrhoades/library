namespace LibraryAPI.Models
{
    public class Book
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string ISBN { get; set; } = string.Empty;
        public string Publisher { get; set; } = string.Empty;
        public List<Category> Categories { get; set; } = new List<Category>();
        public DateTime PublishedDate { get; set; }
        public int Pages { get; set; }
    }
}