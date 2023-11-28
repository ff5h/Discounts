namespace Discounts.Backend.Auth.Core.Dtos.Shop
{
    public class VoteShopDto
    {
        public Guid ShopId { get; set; }
        public required string UserId { get; set; }
        public double Value { get; set; }
    }
}
