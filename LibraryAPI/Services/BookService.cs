using LibraryAPI.Data;
using LibraryAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Services;
public interface IBookService
{
    Task<List<Book>> SearchBooksAsync(string searchTerm);
    Task<List<Book>> GetAllBooksAsync();
    Task<List<Book>> GetFeaturedBooksAsync();
    Task<Book?> GetBookByIdAsync(Guid id);
    Task AddBookAsync(Book book);
    Task<bool> UpdateBookAsync(Book book);
    Task DeleteBookAsync(Guid id);
    Task<List<Book>?> RentBooksAsync(Guid[] bookIds, Guid userId);

    Task<bool> ReturnBookAsync(Guid bookId);
    Task<List<UserRentalGroupDto>> GetRentalsGroupByUserAsync();
}
public class BookService : IBookService
{
    private readonly ApplicationDbContext _context;

    public BookService(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<List<Book>> SearchBooksAsync(string searchTerm)
    {
        return await _context.Books.Where(book => book.Title.Contains(searchTerm)).ToListAsync();
    }

    public async Task<List<Book>> GetAllBooksAsync()
    {
        return await _context.Books.Include(b => b.Categories).ToListAsync();
    }
    public async Task<List<Book>> GetFeaturedBooksAsync()
    {
        return await _context.Books
            .Include(book => book.Categories)
            .OrderBy(book => Guid.NewGuid())
            .Take(5)
            .ToListAsync();
    }
    public async Task<Book?> GetBookByIdAsync(Guid id)
    {
        return await _context.Books.Include(b => b.Categories).FirstOrDefaultAsync(b => b.Id == id);
    }

    public async Task AddBookAsync(Book book)
    {
        foreach (var category in book.Categories)
        {
            _context.Entry(category).State = EntityState.Unchanged;
        }

        _context.Books.Add(book);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> UpdateBookAsync(Book book)
    {
        var existingBook = await _context.Books
            .Include(existing => existing.Categories)
            .SingleOrDefaultAsync(existing => existing.Id == book.Id);

        if (existingBook == null)
        {
            return false;
        }

        var existingUserId = existingBook.UserId;

        existingBook.Title = book.Title;
        existingBook.Author = book.Author;
        existingBook.Description = book.Description;
        existingBook.ISBN = book.ISBN;
        existingBook.Publisher = book.Publisher;
        existingBook.PublishedDate = book.PublishedDate;
        existingBook.Pages = book.Pages;
        existingBook.ImageUrl = book.ImageUrl;

        // do not overwrite renter from form payload
        existingBook.UserId = existingUserId;

        var categoryIds = book.Categories
            .Select(category => category.Id)
            .Distinct()
            .ToList();

        var categories = await _context.Categories
            .Where(category => categoryIds.Contains(category.Id))
            .ToListAsync();

        existingBook.Categories.Clear();
        foreach (var category in categories)
        {
            existingBook.Categories.Add(category);
        }

        await _context.SaveChangesAsync();
        return true;
    }
    public async Task DeleteBookAsync(Guid id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book != null)
        {
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
        }
    }
    public async Task<List<Book>?> RentBooksAsync(Guid[] bookIds, Guid userId)
    {
        
        var user = await _context.Users.FindAsync(userId);
        if(user is null)
        {
            return null;
        }
        DateTime dueDate = DateTime.Now.Date.AddDays(5);
        var booksToRent = await _context.Books.Where(book => bookIds.Contains(book.Id)).ToListAsync();

        if(booksToRent is null || booksToRent.Count == 0)
        {
            return null;
        }
        var rentedBooks = new List<Book>();
        booksToRent.ForEach(b => {
            if(b.UserId == null && b.DueDate == null)
            {
                b.UserId = userId;
                b.DueDate = dueDate;
                rentedBooks.Add(b);
            }
        });
        await _context.SaveChangesAsync();
        return rentedBooks;
    }
    public async Task<bool> ReturnBookAsync(Guid bookId)
    {
        var book = await _context.Books.FindAsync(bookId);
        if(book is null)
        {
            return false;
        }
        book.DueDate = null;
        book.UserId = null;
        book.User = null;

        await _context.SaveChangesAsync();

        return true;
    }
    public async Task<List<UserRentalGroupDto>> GetRentalsGroupByUserAsync()
    {
        return await _context.Books
            .Where(book => book.UserId != null)
            .GroupBy(book => new
            {
                UserId = book.UserId!.Value,
                Email = book.User!.Email!
            })
            .Select(group => new UserRentalGroupDto
            {
                UserId = group.Key.UserId,
                Email = group.Key.Email,
                Rentals = group.ToList()
            })
            .ToListAsync();
    }
}