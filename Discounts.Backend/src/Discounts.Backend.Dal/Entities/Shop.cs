namespace Discounts.Backend.Dal.Entities
{
    public class Shop
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }

        public ICollection<Vote> Votes { get; set; } = null!;

        public DateTime OpenTime { get; set; }
        public DateTime CloseTime { get; set; }
        public required string City { get; set; }
        public required string Address { get; set; }

        public Guid CompanyId { get; set; }
        public required Company Company { get; set; }

        public ICollection<Promotion> Promotions { get; set; } = null!;
    }
}
