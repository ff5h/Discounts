namespace Discounts.Backend.Dal.Entities
{
    public class Promotion
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public ICollection<Product> Products { get; set; } = null!;
    }
}
