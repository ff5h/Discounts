namespace Discounts.Backend.Api.Contracts.Promotion
{
    public class CreatePromotionRequest
    {
        public required string Title { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public Guid ShopId { get; set; }
    }
}
