namespace Discounts.Backend.Auth.Core.Dtos.Promotion
{
    public class CreatePromotionDto
    {
        public required string Title { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public Guid ShopId { get; set; }
    }
}
