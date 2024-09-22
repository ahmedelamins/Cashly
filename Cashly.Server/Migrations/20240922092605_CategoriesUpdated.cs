using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cashly.Server.Migrations
{
    /// <inheritdoc />
    public partial class CategoriesUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Id",
                keyValue: 4,
                column: "Name",
                value: "Shopping");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Id",
                keyValue: 4,
                column: "Name",
                value: "Savings");
        }
    }
}
