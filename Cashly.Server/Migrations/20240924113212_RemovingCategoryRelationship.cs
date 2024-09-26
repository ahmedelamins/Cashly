using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Cashly.Server.Migrations
{
    /// <inheritdoc />
    public partial class RemovingCategoryRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_Categories_CategoryId",
                table: "Expenses");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Expenses_CategoryId",
                table: "Expenses");

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

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Expenses",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Expenses");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreatedAt",
                table: "Expenses",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Expenses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Expenses");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Expenses",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Expenses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Utility" },
                    { 2, "Food" },
                    { 3, "Fun" },
                    { 4, "Shopping" },
                    { 5, "Other" }
                });

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
                    { 8, 45.00m, 5, new DateTime(2023, 8, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "Fix phone", 1 },
                    { 9, 45.00m, 4, new DateTime(2023, 8, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "New shirt", 2009 },
                    { 10, 60.00m, 5, new DateTime(2023, 8, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), "Date", 2009 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_CategoryId",
                table: "Expenses",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_Categories_CategoryId",
                table: "Expenses",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
