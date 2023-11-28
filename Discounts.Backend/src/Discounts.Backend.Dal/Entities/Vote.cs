namespace Discounts.Backend.Dal.Entities
{
    public class Vote
    {
        public Guid Id { get; set; }

        public required string UserId { get; set; }
        public required User User { get; set; }

        public Guid ShopId { get; set; }
        public required Shop Shop { get; set; }

        public double Value { get; set; }
    }
}
