namespace Discounts.Backend.Dal.Entities
{
    public class ProductCategory
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        public ICollection<Product> Products { get; set; } = null!;
    }
}
