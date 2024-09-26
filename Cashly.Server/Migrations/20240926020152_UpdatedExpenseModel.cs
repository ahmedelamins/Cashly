using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cashly.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedExpenseModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Expenses",
                newName: "Date");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Expenses",
                newName: "CreatedAt");
        }
    }
}
