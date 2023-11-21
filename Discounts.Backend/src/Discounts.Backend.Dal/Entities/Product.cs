namespace Discounts.Backend.Dal.Entities
{
    public class Product
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public double OldPrice { get; set; }
        public double NewPrice { get; set; }
        public required ProductCategory Category { get; set; }

        public Guid PromotionId { get; set; }
        public required Promotion Promotion { get; set; }
    }
}
