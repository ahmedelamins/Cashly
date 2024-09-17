using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Cashly.Server.Migrations
{
    /// <inheritdoc />
    public partial class ExpenseSeeding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Expenses",
                columns: new[] { "Id", "Amount", "CreatedAt", "Title", "UserId" },
                values: new object[,]
                {
                    { 1, 12.99m, new DateTime(2024, 9, 17, 12, 30, 0, 0, DateTimeKind.Unspecified), "Lunch", 1 },
                    { 2, 99.99m, new DateTime(2024, 9, 17, 1, 30, 0, 0, DateTimeKind.Unspecified), "shopping", 1 },
                    { 3, 5.99m, new DateTime(2024, 9, 17, 2, 20, 0, 0, DateTimeKind.Unspecified), "cinema", 1 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
