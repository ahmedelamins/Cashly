using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Cashly.Server.Migrations
{
    /// <inheritdoc />
    public partial class SeedingExpenses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Expenses",
                columns: new[] { "Id", "Amount", "CategoryId", "CreatedAt", "Title", "UserId" },
                values: new object[,]
                {
                    { 1, 1200.00m, 1, new DateTime(2024, 9, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "Rent", 1 },
                    { 2, 120.50m, 1, new DateTime(2023, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Electric Bill", 1 },
                    { 3, 80.99m, 2, new DateTime(2023, 9, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), "Groceries", 1 },
                    { 4, 24.57m, 2, new DateTime(2023, 9, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), "Lunch", 1 },
                    { 5, 70.00m, 4, new DateTime(2023, 9, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "New Shoes", 1 },
                    { 6, 45.00m, 3, new DateTime(2023, 8, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "Concert Ticket", 1 },
                    { 7, 25.75m, 5, new DateTime(2023, 9, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Charity", 1 },
                    { 8, 45.00m, 5, new DateTime(2023, 8, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "Fix phone", 1 }
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

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 8);
        }
    }
}
