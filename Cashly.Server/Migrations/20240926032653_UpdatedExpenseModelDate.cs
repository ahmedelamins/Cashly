using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cashly.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedExpenseModelDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "Expenses");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Date",
                table: "Expenses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
