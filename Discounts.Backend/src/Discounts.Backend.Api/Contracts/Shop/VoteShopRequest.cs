namespace Discounts.Backend.Api.Contracts.Shop
{
    public class VoteShopRequest
    {
        public Guid ShopId { get; set; }
        public required string UserId { get; set; }
        public double Value { get; set; }
    }
}
