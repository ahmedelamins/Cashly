using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Cashly.Server.Migrations
{
    /// <inheritdoc />
    public partial class DataSeedingForExample : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Expenses",
                columns: new[] { "Id", "Amount", "Category", "Date", "Title", "UserId" },
                values: new object[,]
                {
                    { 4229, 80.52m, "Utility", new DateOnly(2024, 9, 13), "Electricity Bill", 7 },
                    { 4442, 54.66m, "Food", new DateOnly(2024, 9, 16), "Fuel", 7 },
                    { 5694, 0.12m, "Utility", new DateOnly(2024, 9, 20), "Internet", 7 },
                    { 7777, 60.25m, "Other", new DateOnly(2024, 10, 2), "Internet", 7 },
                    { 7939, 44.86m, "Utility", new DateOnly(2024, 9, 25), "Dining Out", 7 },
                    { 8058, 52.57m, "Shopping", new DateOnly(2024, 9, 24), "Shopping", 7 },
                    { 8962, 4.20m, "Other", new DateOnly(2024, 10, 4), "Electricity Bill", 7 },
                    { 9476, 34.77m, "Fun", new DateOnly(2024, 9, 11), "Dining Out", 7 },
                    { 15527, 74.25m, "Fun", new DateOnly(2024, 9, 7), "Electricity Bill", 7 },
                    { 16055, 92.32m, "Shopping", new DateOnly(2024, 9, 10), "Electricity Bill", 7 },
                    { 17189, 17.33m, "Fun", new DateOnly(2024, 9, 15), "Electricity Bill", 7 },
                    { 20442, 85.60m, "Utility", new DateOnly(2024, 9, 19), "Dining Out", 7 },
                    { 33265, 24.68m, "Fun", new DateOnly(2024, 9, 6), "Electricity Bill", 7 },
                    { 37699, 62.27m, "Other", new DateOnly(2024, 9, 28), "Internet", 7 },
                    { 39519, 31.79m, "Fun", new DateOnly(2024, 9, 12), "Electricity Bill", 7 },
                    { 45448, 73.74m, "Food", new DateOnly(2024, 10, 5), "Groceries", 7 },
                    { 49940, 43.07m, "Food", new DateOnly(2024, 9, 18), "Fuel", 7 },
                    { 51620, 76.52m, "Shopping", new DateOnly(2024, 9, 8), "Dining Out", 7 },
                    { 52750, 94.72m, "Utility", new DateOnly(2024, 10, 3), "Gym Membership", 7 },
                    { 57859, 97.84m, "Shopping", new DateOnly(2024, 9, 9), "Internet", 7 },
                    { 63140, 36.26m, "Food", new DateOnly(2024, 9, 30), "Electricity Bill", 7 },
                    { 63233, 7.36m, "Shopping", new DateOnly(2024, 10, 1), "Internet", 7 },
                    { 65913, 92.20m, "Shopping", new DateOnly(2024, 9, 29), "Shopping", 7 },
                    { 74632, 57.73m, "Fun", new DateOnly(2024, 9, 27), "Electricity Bill", 7 },
                    { 75424, 2.51m, "Food", new DateOnly(2024, 9, 23), "Fuel", 7 },
                    { 79801, 8.30m, "Food", new DateOnly(2024, 9, 26), "Internet", 7 },
                    { 87276, 63.76m, "Shopping", new DateOnly(2024, 9, 22), "Groceries", 7 },
                    { 97546, 62.57m, "Food", new DateOnly(2024, 9, 14), "Dining Out", 7 },
                    { 98319, 27.11m, "Utility", new DateOnly(2024, 9, 21), "Internet", 7 },
                    { 98779, 41.14m, "Fun", new DateOnly(2024, 9, 17), "Groceries", 7 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 4229);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 4442);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 5694);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 7777);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 7939);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 8058);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 8962);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 9476);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 15527);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 16055);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 17189);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 20442);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 33265);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 37699);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 39519);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 45448);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 49940);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 51620);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 52750);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 57859);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 63140);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 63233);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 65913);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 74632);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 75424);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 79801);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 87276);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 97546);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 98319);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 98779);
        }
    }
}
