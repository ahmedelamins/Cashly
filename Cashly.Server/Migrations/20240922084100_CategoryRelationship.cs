using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Cashly.Server.Migrations
{
    /// <inheritdoc />
    public partial class CategoryRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Expenses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_CategoryId",
                table: "Expenses",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_Category_CategoryId",
                table: "Expenses",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_Category_CategoryId",
                table: "Expenses");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropIndex(
                name: "IX_Expenses_CategoryId",
                table: "Expenses");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Expenses");

            migrationBuilder.InsertData(
                table: "Expenses",
                columns: new[] { "Id", "Amount", "CreatedAt", "Title", "UserId" },
                values: new object[,]
                {
                    { 1, 12.99m, new DateTime(2024, 9, 17, 12, 30, 0, 0, DateTimeKind.Unspecified), "Lunch", 1 },
                    { 2, 99.99m, new DateTime(2024, 9, 17, 1, 30, 0, 0, DateTimeKind.Unspecified), "shopping", 1 },
                    { 3, 5.99m, new DateTime(2024, 9, 17, 2, 20, 0, 0, DateTimeKind.Unspecified), "cinema", 3 },
                    { 4, 24.99m, new DateTime(2024, 9, 16, 8, 20, 0, 0, DateTimeKind.Unspecified), "haircut", 3 }
                });
        }
    }
}
