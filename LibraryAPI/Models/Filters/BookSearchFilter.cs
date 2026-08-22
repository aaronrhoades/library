namespace LibraryAPI.Models.Filters;
public class BookSearchFilter
{
    public string? Title { get; set; }
    public string? Author { get; set; }
    public bool? Available { get; set; }

    public string SortBy { get; set; } = "Title";
    public string SortDirection { get; set; } = "asc";
}