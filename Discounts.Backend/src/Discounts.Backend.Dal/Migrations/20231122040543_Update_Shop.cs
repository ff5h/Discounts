using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Discounts.Backend.Dal.Migrations
{
    /// <inheritdoc />
    public partial class Update_Shop : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Promotions_Shops_ShopId",
                table: "Promotions");

            migrationBuilder.AlterColumn<Guid>(
                name: "ShopId",
                table: "Promotions",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Promotions_Shops_ShopId",
                table: "Promotions",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Promotions_Shops_ShopId",
                table: "Promotions");

            migrationBuilder.AlterColumn<Guid>(
                name: "ShopId",
                table: "Promotions",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_Promotions_Shops_ShopId",
                table: "Promotions",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id");
        }
    }
}
