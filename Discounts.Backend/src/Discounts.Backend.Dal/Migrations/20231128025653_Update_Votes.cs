using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Discounts.Backend.Dal.Migrations
{
    /// <inheritdoc />
    public partial class Update_Votes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Vote_UserId",
                table: "Vote");

            migrationBuilder.CreateIndex(
                name: "IX_Vote_UserId_ShopId",
                table: "Vote",
                columns: new[] { "UserId", "ShopId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Vote_UserId_ShopId",
                table: "Vote");

            migrationBuilder.CreateIndex(
                name: "IX_Vote_UserId",
                table: "Vote",
                column: "UserId");
        }
    }
}
