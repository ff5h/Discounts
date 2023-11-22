namespace Discounts.Backend.Auth.Core.Dtos.Product
{
    public class CreateProductDto
    {
        public required string ImageUrl { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public double OldPrice { get; set; }
        public double NewPrice { get; set; }
        public int CategoryId { get; set; }
        public Guid PromotionId { get; set; }
    }
}
