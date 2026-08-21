using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibraryAPI.Migrations
{
    /// <inheritdoc />
    public partial class BookDueDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DueDate",
                table: "Books",
                type: "datetime2",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("078776f0-aa1f-4f3a-bce4-3487c0d2d1d1"),
                column: "DueDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("0f5c9dc1-8be2-428f-872d-ef4bfbc1973a"),
                column: "DueDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("1be21cd7-b025-4593-8180-9e47af9b9117"),
                column: "DueDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("501b3c1d-e978-421d-927a-65db19080ec2"),
                column: "DueDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("664c8f23-0ee5-45d2-b2c4-8ab2845c4036"),
                column: "DueDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("797a8868-b35b-4af4-b63d-6183e51e664e"),
                column: "DueDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("7a4092bc-deb9-41b7-beff-41fdb9e16c50"),
                column: "DueDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("7d460ffd-0a2e-4b4c-a19b-c36b32c15ada"),
                column: "DueDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("8621b186-53e7-4b29-8cce-e45547a1002c"),
                column: "DueDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: new Guid("86bd2e93-ce71-4a88-b4f6-0cea87305770"),
                column: "DueDate",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "Books");
        }
    }
}
