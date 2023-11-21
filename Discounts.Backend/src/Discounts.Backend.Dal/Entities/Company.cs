namespace Discounts.Backend.Dal.Entities
{
    public class Company
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string ImageUrl { get; set; }
        public ICollection<Shop> Shops { get; set; } = null!;
    }
}
