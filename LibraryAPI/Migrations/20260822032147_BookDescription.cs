using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibraryAPI.Migrations
{
    /// <inheritdoc />
    public partial class BookDescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Books",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("078776f0-aa1f-4f3a-bce4-3487c0d2d1d1"),
                columns: new[] { "Description", "Publisher" },
                values: new object[] { "lorem ipsum dolor sit amet consectetur adipiscing elit dignissimos quas proident eiusmod dolorum consequat voluptas placeat facere facilis incididunt deleniti dolorem expedita ex dolore est animi quo sunt vel nostrud eos molestias distinctio et quas irure nulla voluptas aliqua ut voluptatum mollit officia dolor dolore ut consequatur et aute at", "Lorem Ipsum" });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("0f5c9dc1-8be2-428f-872d-ef4bfbc1973a"),
                columns: new[] { "Description", "Publisher" },
                values: new object[] { "lorem ipsum dolor sit amet consectetur adipiscing elit dignissimos quas proident eiusmod dolorum consequat voluptas placeat facere facilis incididunt deleniti dolorem expedita ex dolore est animi quo sunt vel nostrud eos molestias distinctio et quas irure nulla voluptas aliqua ut voluptatum mollit officia dolor dolore ut consequatur et aute at", "The Publisher" });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("1be21cd7-b025-4593-8180-9e47af9b9117"),
                columns: new[] { "Description", "Publisher" },
                values: new object[] { "lorem ipsum dolor sit amet consectetur adipiscing elit dignissimos quas proident eiusmod dolorum consequat voluptas placeat facere facilis incididunt deleniti dolorem expedita ex dolore est animi quo sunt vel nostrud eos molestias distinctio et quas irure nulla voluptas aliqua ut voluptatum mollit officia dolor dolore ut consequatur et aute at", "Publisher" });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("501b3c1d-e978-421d-927a-65db19080ec2"),
                columns: new[] { "Description", "Publisher" },
                values: new object[] { "lorem ipsum dolor sit amet consectetur adipiscing elit dignissimos quas proident eiusmod dolorum consequat voluptas placeat facere facilis incididunt deleniti dolorem expedita ex dolore est animi quo sunt vel nostrud eos molestias distinctio et quas irure nulla voluptas aliqua ut voluptatum mollit officia dolor dolore ut consequatur et aute at", "Thomas Egerton" });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("664c8f23-0ee5-45d2-b2c4-8ab2845c4036"),
                columns: new[] { "Description", "Publisher" },
                values: new object[] { "lorem ipsum dolor sit amet consectetur adipiscing elit dignissimos quas proident eiusmod dolorum consequat voluptas placeat facere facilis incididunt deleniti dolorem expedita ex dolore est animi quo sunt vel nostrud eos molestias distinctio et quas irure nulla voluptas aliqua ut voluptatum mollit officia dolor dolore ut consequatur et aute at", "The Publisher" });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("797a8868-b35b-4af4-b63d-6183e51e664e"),
                columns: new[] { "Description", "Publisher" },
                values: new object[] { "lorem ipsum dolor sit amet consectetur adipiscing elit dignissimos quas proident eiusmod dolorum consequat voluptas placeat facere facilis incididunt deleniti dolorem expedita ex dolore est animi quo sunt vel nostrud eos molestias distinctio et quas irure nulla voluptas aliqua ut voluptatum mollit officia dolor dolore ut consequatur et aute at", "HarperCollins" });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("7a4092bc-deb9-41b7-beff-41fdb9e16c50"),
                columns: new[] { "Description", "Publisher" },
                values: new object[] { "lorem ipsum dolor sit amet consectetur adipiscing elit dignissimos quas proident eiusmod dolorum consequat voluptas placeat facere facilis incididunt deleniti dolorem expedita ex dolore est animi quo sunt vel nostrud eos molestias distinctio et quas irure nulla voluptas aliqua ut voluptatum mollit officia dolor dolore ut consequatur et aute at", "George Allen & Unwin" });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("7d460ffd-0a2e-4b4c-a19b-c36b32c15ada"),
                columns: new[] { "Description", "Publisher" },
                values: new object[] { "lorem ipsum dolor sit amet consectetur adipiscing elit dignissimos quas proident eiusmod dolorum consequat voluptas placeat facere facilis incididunt deleniti dolorem expedita ex dolore est animi quo sunt vel nostrud eos molestias distinctio et quas irure nulla voluptas aliqua ut voluptatum mollit officia dolor dolore ut consequatur et aute at", "George Allen & Unwin" });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("8621b186-53e7-4b29-8cce-e45547a1002c"),
                columns: new[] { "Description", "Publisher" },
                values: new object[] { "lorem ipsum dolor sit amet consectetur adipiscing elit dignissimos quas proident eiusmod dolorum consequat voluptas placeat facere facilis incididunt deleniti dolorem expedita ex dolore est animi quo sunt vel nostrud eos molestias distinctio et quas irure nulla voluptas aliqua ut voluptatum mollit officia dolor dolore ut consequatur et aute at", "The Publisher" });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("86bd2e93-ce71-4a88-b4f6-0cea87305770"),
                columns: new[] { "Description", "Publisher" },
                values: new object[] { "lorem ipsum dolor sit amet consectetur adipiscing elit dignissimos quas proident eiusmod dolorum consequat voluptas placeat facere facilis incididunt deleniti dolorem expedita ex dolore est animi quo sunt vel nostrud eos molestias distinctio et quas irure nulla voluptas aliqua ut voluptatum mollit officia dolor dolore ut consequatur et aute at", "Secker & Warburg" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Books");

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("078776f0-aa1f-4f3a-bce4-3487c0d2d1d1"),
                column: "Publisher",
                value: "");

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("0f5c9dc1-8be2-428f-872d-ef4bfbc1973a"),
                column: "Publisher",
                value: "");

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("1be21cd7-b025-4593-8180-9e47af9b9117"),
                column: "Publisher",
                value: "");

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("501b3c1d-e978-421d-927a-65db19080ec2"),
                column: "Publisher",
                value: "");

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("664c8f23-0ee5-45d2-b2c4-8ab2845c4036"),
                column: "Publisher",
                value: "");

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("797a8868-b35b-4af4-b63d-6183e51e664e"),
                column: "Publisher",
                value: "");

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("7a4092bc-deb9-41b7-beff-41fdb9e16c50"),
                column: "Publisher",
                value: "");

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("7d460ffd-0a2e-4b4c-a19b-c36b32c15ada"),
                column: "Publisher",
                value: "");

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("8621b186-53e7-4b29-8cce-e45547a1002c"),
                column: "Publisher",
                value: "");

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("86bd2e93-ce71-4a88-b4f6-0cea87305770"),
                column: "Publisher",
                value: "");
        }
    }
}
