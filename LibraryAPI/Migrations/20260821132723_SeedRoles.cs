using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace LibraryAPI.Migrations
{
    /// <inheritdoc />
    public partial class SeedRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { new Guid("a7d4e6b2-9f31-4c58-8a06-2b5e1d7c9f43"), "c3a7d2e8-6f11-4e90-8b5c-2d4f7a9e1b22", "Customer", "CUSTOMER" },
                    { new Guid("f2c9c8f1-5c7e-4f50-9f12-7d2e9b8a1c34"), "f6f9e4d1-4b84-4b9f-9b0a-4f2b1b0f8a11", "Librarian", "LIBRARIAN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("a7d4e6b2-9f31-4c58-8a06-2b5e1d7c9f43"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("f2c9c8f1-5c7e-4f50-9f12-7d2e9b8a1c34"));
        }
    }
}
