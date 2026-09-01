using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend_dotnet.Migrations
{
    /// <inheritdoc />
    public partial class AddProductEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CategoryId", "Name" },
                values: new object[,]
                {
                    { 1, 1, "חלב תנובה" },
                    { 2, 1, "יוגורט" },
                    { 3, 1, "גבינה צהובה" },
                    { 4, 1, "גבינה לבנה" },
                    { 5, 1, "שוקו" },
                    { 6, 1, "חמאה" },
                    { 7, 2, "לחם קל" },
                    { 8, 2, "לחם שיפון" },
                    { 9, 2, "ביסקוויט" },
                    { 10, 2, "עוגיות שוקולד" },
                    { 11, 2, "קרואסאן" },
                    { 12, 2, "לחם שחור" },
                    { 13, 3, "חזה עוף" },
                    { 14, 3, "כבש" },
                    { 15, 3, "בקר" },
                    { 16, 3, "בשר רוטב" },
                    { 17, 3, "קבב" },
                    { 18, 4, "מלפפון" },
                    { 19, 4, "עגבנייה" },
                    { 20, 4, "גזר" },
                    { 21, 4, "תפוח עץ" },
                    { 22, 4, "בננה" },
                    { 23, 4, "תרד" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                column: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
