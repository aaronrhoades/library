using LibraryAPI.Services;
using LibraryAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace LibraryAPI.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class BookController : ControllerBase
{
    private readonly IBookService _bookService;
    private readonly UserManager<User> _userManager;
    public BookController(IBookService bookService, UserManager<User> userManager)
    {
        _bookService = bookService;
        _userManager = userManager;
    }
    [Authorize(Roles = "Librarian,Customer")]
    [HttpGet("search", Name = "SearchBooks")]
    public async Task<ActionResult<IEnumerable<Book>>> Search([FromQuery] string searchTerm)
    {
        var books = await _bookService.SearchBooksAsync(searchTerm);

        return Ok(books);
    }
    [Authorize(Roles = "Librarian,Customer")]
    [HttpGet(Name = "GetBooks")]
    public async Task<ActionResult<IEnumerable<Book>>> Get()
    {
        var books = await _bookService.GetAllBooksAsync();
        return Ok(books);
    }
    [Authorize(Roles = "Librarian,Customer")]
    [HttpGet("{id}", Name = "GetBookById")]
    public async Task<ActionResult<Book>> Get(Guid id)
    {
        var book = await _bookService.GetBookByIdAsync(id);
        if (book == null)
        {
            return NotFound();
        }
        return book;
    }
    [Authorize(Roles = "Librarian")]
    [HttpPost(Name = "CreateBook")]
    public async Task<ActionResult> Post(Book book)
    {
        book.Id = Guid.NewGuid(); // Ensure a new GUID is generated for the book
        await _bookService.AddBookAsync(book);
        return CreatedAtAction(nameof(Get), new { id = book.Id }, book);
    }
    [Authorize(Roles = "Librarian")]
    [HttpPut("{id}", Name = "UpdateBook")]
    public async Task<ActionResult> Put(Guid id, Book book)
    {
        if (id != book.Id)
        {
            return BadRequest();
        }

        var updated = await _bookService.UpdateBookAsync(book);
        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }
    [Authorize(Roles = "Librarian")]
    [HttpDelete("{id}", Name = "DeleteBook")]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _bookService.DeleteBookAsync(id);
        return NoContent();
    }

    [Authorize(Roles = "Customer")]
    [HttpPatch("rent")]
    
    public async Task<ActionResult> RentBooks(Guid[] bookIds)
    {   
        var user = await _userManager.GetUserAsync(User);
        if (user is null)
        {
            return BadRequest("User not found");
        }
        var result = await this._bookService.RentBooks(bookIds, user.Id);

        if(result is null || result.Count == 0)
        {
            return BadRequest("Books were not rented");
        }

        return Ok(result);
    }
    [Authorize(Roles = "Librarian")]
    [HttpPatch("return")]
    public async Task<ActionResult> ReturnBook(Guid bookId)
    {
        var result = await this._bookService.ReturnBook(bookId);
        if (!result)
        {
            return BadRequest();
        }
        return Ok(result);
    }
}
