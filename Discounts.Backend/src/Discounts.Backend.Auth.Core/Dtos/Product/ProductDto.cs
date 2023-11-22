namespace Discounts.Backend.Auth.Core.Dtos.Product
{
    public class ProductDto
    {
        public Guid Id { get; set; }
        public required string ImageUrl { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public double OldPrice { get; set; }
        public double NewPrice { get; set; }
        public required string CategoryName { get; set; }
    }
}
