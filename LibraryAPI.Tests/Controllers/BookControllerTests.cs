using LibraryAPI.Controllers;
using LibraryAPI.Models;
using LibraryAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace LibraryAPI.Tests;

public class BookControllerTests
{
    [Fact]
    public async Task Get_ReturnsListOfBooks()
    {
        var books = new List<Book>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Title = "The Hobbit",
                Author = "J.R.R. Tolkien"
            }
        };

        var service = new Mock<IBookService>();
        service
            .Setup(x => x.GetAllBooksAsync())
            .ReturnsAsync(books);

        var controller = new BookController(
            service.Object,
            userManager: null!);

        var result = await controller.Get();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedBooks = Assert.IsType<List<Book>>(okResult.Value);

        Assert.Single(returnedBooks);
        Assert.Equal("The Hobbit", returnedBooks[0].Title);

        service.Verify(x => x.GetAllBooksAsync(), Times.Once);
    }
}