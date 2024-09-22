using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Cashly.Server.Migrations
{
    /// <inheritdoc />
    public partial class MoreExpensesSeeding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Expenses",
                columns: new[] { "Id", "Amount", "CategoryId", "CreatedAt", "Title", "UserId" },
                values: new object[,]
                {
                    { 9, 45.00m, 4, new DateTime(2023, 8, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "New shirt", 2009 },
                    { 10, 60.00m, 5, new DateTime(2023, 8, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), "Date", 2009 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 10);
        }
    }
}
