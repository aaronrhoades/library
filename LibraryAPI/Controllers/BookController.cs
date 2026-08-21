using LibraryAPI.Services;
using LibraryAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace LibraryAPI.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class BookController : ControllerBase
{
    private readonly IBookService _bookService;
    public BookController(IBookService bookService)
    {
        _bookService = bookService;
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
}
