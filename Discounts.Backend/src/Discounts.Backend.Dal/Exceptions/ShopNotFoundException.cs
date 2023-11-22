namespace Discounts.Backend.Dal.Exceptions
{
    public class ShopNotFoundException : NotFoundException
    {
        public ShopNotFoundException(Guid shopId)
        : base($"Shop with id {shopId} not found") { }
    }
}
