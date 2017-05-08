using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Vega.Migrations
{
    public partial class VehicleFeature : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Features",
                table: "tb_CarFeature");

            migrationBuilder.RenameTable(
                name: "tb_CarFeature",
                newName: "tb_CarFeature");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tb_CarFeature",
                table: "tb_CarFeature",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "tb_Vehicle",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ContactEmail = table.Column<string>(nullable: true),
                    ContactName = table.Column<string>(maxLength: 255, nullable: false),
                    ContactPhone = table.Column<string>(maxLength: 255, nullable: false),
                    LastUpdate = table.Column<DateTime>(nullable: false),
                    ModelId = table.Column<int>(nullable: false),
                    isRegistered = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_Vehicle", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tb_Vehicle_tb_CarModel_ModelId",
                        column: x => x.ModelId,
                        principalTable: "tb_CarModel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_VehicleFeature",
                columns: table => new
                {
                    VehicleId = table.Column<int>(nullable: false),
                    FeatureId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_VehicleFeature", x => new { x.VehicleId, x.FeatureId });
                    table.ForeignKey(
                        name: "FK_tb_VehicleFeature_tb_CarFeature_FeatureId",
                        column: x => x.FeatureId,
                        principalTable: "tb_CarFeature",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_VehicleFeature_tb_Vehicle_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "tb_Vehicle",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tb_Vehicle_ModelId",
                table: "tb_Vehicle",
                column: "ModelId");

            migrationBuilder.CreateIndex(
                name: "IX_tb_VehicleFeature_FeatureId",
                table: "tb_VehicleFeature",
                column: "FeatureId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tb_VehicleFeature");

            migrationBuilder.DropTable(
                name: "tb_Vehicle");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tb_CarFeature",
                table: "tb_CarFeature");

            migrationBuilder.RenameTable(
                name: "tb_CarFeature",
                newName: "Features");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Features",
                table: "Features",
                column: "Id");
        }
    }
}
