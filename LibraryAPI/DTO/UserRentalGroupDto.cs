using LibraryAPI.Models;
namespace LibraryAPI.DTO;
public sealed class UserRentalGroupDto
{
    public Guid UserId { get; init; }
    public string Email { get; init; } = string.Empty;
    public List<Book> Rentals { get; init; } = [];
}