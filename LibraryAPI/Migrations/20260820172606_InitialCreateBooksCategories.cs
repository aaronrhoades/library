using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace LibraryAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreateBooksCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Author = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ISBN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Publisher = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PublishedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Pages = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BookCategory",
                columns: table => new
                {
                    BooksId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CategoriesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookCategory", x => new { x.BooksId, x.CategoriesId });
                    table.ForeignKey(
                        name: "FK_BookCategory_Books_BooksId",
                        column: x => x.BooksId,
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookCategory_Categories_CategoriesId",
                        column: x => x.CategoriesId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Author", "ISBN", "Pages", "PublishedDate", "Publisher", "Title" },
                values: new object[,]
                {
                    { new Guid("078776f0-aa1f-4f3a-bce4-3487c0d2d1d1"), "J.D. Salinger", "9780316769488", 278, new DateTime(1951, 7, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), "", "The Catcher in the Rye" },
                    { new Guid("0f5c9dc1-8be2-428f-872d-ef4bfbc1973a"), "Harper Lee", "9780446310789", 281, new DateTime(1960, 7, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "", "To Kill a Mockingbird" },
                    { new Guid("1be21cd7-b025-4593-8180-9e47af9b9117"), "Dan Brown", "9780307474278", 689, new DateTime(2003, 3, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), "", "The Da Vinci Code" },
                    { new Guid("501b3c1d-e978-421d-927a-65db19080ec2"), "Jane Austen", "9780141439518", 279, new DateTime(1813, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "", "Pride and Prejudice" },
                    { new Guid("664c8f23-0ee5-45d2-b2c4-8ab2845c4036"), "Paulo Coelho", "9780061122415", 208, new DateTime(1988, 4, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "", "The Alchemist" },
                    { new Guid("797a8868-b35b-4af4-b63d-6183e51e664e"), "C.S. Lewis", "9780066238500", 767, new DateTime(1950, 10, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), "", "The Chronicles of Narnia" },
                    { new Guid("7a4092bc-deb9-41b7-beff-41fdb9e16c50"), "J.R.R. Tolkien", "9780547928227", 310, new DateTime(1937, 9, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "", "The Hobbit" },
                    { new Guid("7d460ffd-0a2e-4b4c-a19b-c36b32c15ada"), "J.R.R. Tolkien", "9780544003415", 1216, new DateTime(1954, 7, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), "", "The Lord of the Rings" },
                    { new Guid("8621b186-53e7-4b29-8cce-e45547a1002c"), "F. Scott Fitzgerald", "9780743273565", 218, new DateTime(1925, 4, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "", "The Great Gatsby" },
                    { new Guid("86bd2e93-ce71-4a88-b4f6-0cea87305770"), "George Orwell", "9780451524935", 328, new DateTime(1948, 6, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), "", "1984" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("07360829-b4b1-43db-a3a2-e87216c52120"), "Fantasy" },
                    { new Guid("07912d1e-51dd-4484-b973-13456bbfc74e"), "Non-Fiction" },
                    { new Guid("296325e9-b05a-4222-acfd-7290626d5b01"), "Mystery" },
                    { new Guid("3ecccbd0-a23a-45b0-81be-d8cdb9391a6b"), "Romance" },
                    { new Guid("4518f363-4ffb-4d18-b1fa-39da5ac5c4f8"), "Science" },
                    { new Guid("73fa3fd6-2d01-431e-af36-8362820ab7fd"), "History" },
                    { new Guid("c4a77fcd-661c-4352-b1a6-4675f0a748bd"), "Action" },
                    { new Guid("cb8d7ed9-282d-4d5e-a79d-7fe95bb446c2"), "Adventure" },
                    { new Guid("d38a4fd7-230e-4431-9c49-afb7398dd477"), "Fiction" }
                });

            migrationBuilder.InsertData(
                table: "BookCategory",
                columns: new[] { "BooksId", "CategoriesId" },
                values: new object[,]
                {
                    { new Guid("078776f0-aa1f-4f3a-bce4-3487c0d2d1d1"), new Guid("cb8d7ed9-282d-4d5e-a79d-7fe95bb446c2") },
                    { new Guid("078776f0-aa1f-4f3a-bce4-3487c0d2d1d1"), new Guid("d38a4fd7-230e-4431-9c49-afb7398dd477") },
                    { new Guid("0f5c9dc1-8be2-428f-872d-ef4bfbc1973a"), new Guid("cb8d7ed9-282d-4d5e-a79d-7fe95bb446c2") },
                    { new Guid("0f5c9dc1-8be2-428f-872d-ef4bfbc1973a"), new Guid("d38a4fd7-230e-4431-9c49-afb7398dd477") },
                    { new Guid("1be21cd7-b025-4593-8180-9e47af9b9117"), new Guid("cb8d7ed9-282d-4d5e-a79d-7fe95bb446c2") },
                    { new Guid("1be21cd7-b025-4593-8180-9e47af9b9117"), new Guid("d38a4fd7-230e-4431-9c49-afb7398dd477") },
                    { new Guid("501b3c1d-e978-421d-927a-65db19080ec2"), new Guid("cb8d7ed9-282d-4d5e-a79d-7fe95bb446c2") },
                    { new Guid("501b3c1d-e978-421d-927a-65db19080ec2"), new Guid("d38a4fd7-230e-4431-9c49-afb7398dd477") },
                    { new Guid("664c8f23-0ee5-45d2-b2c4-8ab2845c4036"), new Guid("cb8d7ed9-282d-4d5e-a79d-7fe95bb446c2") },
                    { new Guid("664c8f23-0ee5-45d2-b2c4-8ab2845c4036"), new Guid("d38a4fd7-230e-4431-9c49-afb7398dd477") },
                    { new Guid("797a8868-b35b-4af4-b63d-6183e51e664e"), new Guid("cb8d7ed9-282d-4d5e-a79d-7fe95bb446c2") },
                    { new Guid("797a8868-b35b-4af4-b63d-6183e51e664e"), new Guid("d38a4fd7-230e-4431-9c49-afb7398dd477") },
                    { new Guid("7a4092bc-deb9-41b7-beff-41fdb9e16c50"), new Guid("cb8d7ed9-282d-4d5e-a79d-7fe95bb446c2") },
                    { new Guid("7a4092bc-deb9-41b7-beff-41fdb9e16c50"), new Guid("d38a4fd7-230e-4431-9c49-afb7398dd477") },
                    { new Guid("7d460ffd-0a2e-4b4c-a19b-c36b32c15ada"), new Guid("cb8d7ed9-282d-4d5e-a79d-7fe95bb446c2") },
                    { new Guid("7d460ffd-0a2e-4b4c-a19b-c36b32c15ada"), new Guid("d38a4fd7-230e-4431-9c49-afb7398dd477") },
                    { new Guid("8621b186-53e7-4b29-8cce-e45547a1002c"), new Guid("d38a4fd7-230e-4431-9c49-afb7398dd477") },
                    { new Guid("86bd2e93-ce71-4a88-b4f6-0cea87305770"), new Guid("07912d1e-51dd-4484-b973-13456bbfc74e") },
                    { new Guid("86bd2e93-ce71-4a88-b4f6-0cea87305770"), new Guid("73fa3fd6-2d01-431e-af36-8362820ab7fd") }
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookCategory_CategoriesId",
                table: "BookCategory",
                column: "CategoriesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookCategory");

            migrationBuilder.DropTable(
                name: "Books");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
