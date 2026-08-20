using Microsoft.EntityFrameworkCore;
using LibraryAPI.Models;

namespace LibraryAPI.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Book> Books { get; set; }
    public DbSet<Category> Categories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        SeedData(modelBuilder);
    }

    private void SeedData(ModelBuilder modelBuilder)
    {
        var fictionCategoryId = new Guid("d38a4fd7-230e-4431-9c49-afb7398dd477");
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = fictionCategoryId, Name = "Fiction" }
        );

        var nonFictionCategoryId = new Guid("07912d1e-51dd-4484-b973-13456bbfc74e");
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = nonFictionCategoryId, Name = "Non-Fiction" }
        );

        var scienceCategoryId = new Guid("4518f363-4ffb-4d18-b1fa-39da5ac5c4f8");
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = scienceCategoryId, Name = "Science" }
        );

        var actionCategoryId = new Guid("c4a77fcd-661c-4352-b1a6-4675f0a748bd");
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = actionCategoryId, Name = "Action" }
        );

        var romanceCategoryId = new Guid("3ecccbd0-a23a-45b0-81be-d8cdb9391a6b");
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = romanceCategoryId, Name = "Romance" }
        );

        var mysteryCategoryId = new Guid("296325e9-b05a-4222-acfd-7290626d5b01");
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = mysteryCategoryId, Name = "Mystery" }
        );

        var fantasyCategoryId = new Guid("07360829-b4b1-43db-a3a2-e87216c52120");
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = fantasyCategoryId, Name = "Fantasy" }
        );

        var historyCategoryId = new Guid("73fa3fd6-2d01-431e-af36-8362820ab7fd");
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = historyCategoryId, Name = "History" }
        );

        var adventureCategoryId = new Guid("cb8d7ed9-282d-4d5e-a79d-7fe95bb446c2");
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = adventureCategoryId, Name = "Adventure" }
        );
        var greatGatsbyId = new Guid("8621b186-53e7-4b29-8cce-e45547a1002c");
        var mockingbirdId = new Guid("0f5c9dc1-8be2-428f-872d-ef4bfbc1973a");
        var nineteenEightyFourId = new Guid("86bd2e93-ce71-4a88-b4f6-0cea87305770");
        var hobbitId = new Guid("7a4092bc-deb9-41b7-beff-41fdb9e16c50");
        var prideAndPrejudiceId = new Guid("501b3c1d-e978-421d-927a-65db19080ec2");
        var catcherInTheRyeId = new Guid("078776f0-aa1f-4f3a-bce4-3487c0d2d1d1");
        var daVinciCodeId = new Guid("1be21cd7-b025-4593-8180-9e47af9b9117");
        var alchemistId = new Guid("664c8f23-0ee5-45d2-b2c4-8ab2845c4036");
        var lordOfTheRingsId = new Guid("7d460ffd-0a2e-4b4c-a19b-c36b32c15ada");
        var chroniclesOfNarniaId = new Guid("797a8868-b35b-4af4-b63d-6183e51e664e");

        modelBuilder.Entity<Book>().HasData(
            new Book { Id = greatGatsbyId, Title = "The Great Gatsby", Author = "F. Scott Fitzgerald", ISBN = "9780743273565", PublishedDate = new DateTime(1925, 4, 10), Pages = 218 },
            new Book { Id = mockingbirdId, Title = "To Kill a Mockingbird", Author = "Harper Lee", ISBN = "9780446310789", PublishedDate = new DateTime(1960, 7, 11), Pages = 281 },
            new Book { Id = nineteenEightyFourId, Title = "1984", Author = "George Orwell", ISBN = "9780451524935", PublishedDate = new DateTime(1948, 6, 8), Pages = 328 },
            new Book { Id = hobbitId, Title = "The Hobbit", Author = "J.R.R. Tolkien", ISBN = "9780547928227", PublishedDate = new DateTime(1937, 9, 21), Pages = 310 },
            new Book { Id = prideAndPrejudiceId, Title = "Pride and Prejudice", Author = "Jane Austen", ISBN = "9780141439518", PublishedDate = new DateTime(1813, 1, 28), Pages = 279 },
            new Book { Id = catcherInTheRyeId, Title = "The Catcher in the Rye", Author = "J.D. Salinger", ISBN = "9780316769488", PublishedDate = new DateTime(1951, 7, 16), Pages = 278 },
            new Book { Id = daVinciCodeId, Title = "The Da Vinci Code", Author = "Dan Brown", ISBN = "9780307474278", PublishedDate = new DateTime(2003, 3, 18), Pages = 689 },
            new Book { Id = alchemistId, Title = "The Alchemist", Author = "Paulo Coelho", ISBN = "9780061122415", PublishedDate = new DateTime(1988, 4, 15), Pages = 208 },
            new Book { Id = lordOfTheRingsId, Title = "The Lord of the Rings", Author = "J.R.R. Tolkien", ISBN = "9780544003415", PublishedDate = new DateTime(1954, 7, 29), Pages = 1216 },
            new Book { Id = chroniclesOfNarniaId, Title = "The Chronicles of Narnia", Author = "C.S. Lewis", ISBN = "9780066238500", PublishedDate = new DateTime(1950, 10, 16), Pages = 767 }
        );

        modelBuilder.Entity("BookCategory").HasData(
            new { BooksId = greatGatsbyId, CategoriesId = fictionCategoryId },
            new { BooksId = mockingbirdId, CategoriesId = fictionCategoryId },
            new { BooksId = mockingbirdId, CategoriesId = adventureCategoryId },
            new { BooksId = nineteenEightyFourId, CategoriesId = nonFictionCategoryId },
            new { BooksId = nineteenEightyFourId, CategoriesId = historyCategoryId },
            new { BooksId = hobbitId, CategoriesId = fictionCategoryId },
            new { BooksId = hobbitId, CategoriesId = adventureCategoryId },
            new { BooksId = prideAndPrejudiceId, CategoriesId = fictionCategoryId },
            new { BooksId = prideAndPrejudiceId, CategoriesId = adventureCategoryId },
            new { BooksId = catcherInTheRyeId, CategoriesId = fictionCategoryId },
            new { BooksId = catcherInTheRyeId, CategoriesId = adventureCategoryId },
            new { BooksId = daVinciCodeId, CategoriesId = fictionCategoryId },
            new { BooksId = daVinciCodeId, CategoriesId = adventureCategoryId },
            new { BooksId = alchemistId, CategoriesId = fictionCategoryId },
            new { BooksId = alchemistId, CategoriesId = adventureCategoryId },
            new { BooksId = lordOfTheRingsId, CategoriesId = fictionCategoryId },
            new { BooksId = lordOfTheRingsId, CategoriesId = adventureCategoryId },
            new { BooksId = chroniclesOfNarniaId, CategoriesId = fictionCategoryId },
            new { BooksId = chroniclesOfNarniaId, CategoriesId = adventureCategoryId }
        );
    }
}