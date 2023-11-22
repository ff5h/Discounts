namespace Discounts.Backend.Dal.Exceptions
{
    public class PromotionNotFoundException : NotFoundException
    {
        public PromotionNotFoundException(Guid promotionId)
        : base($"Promotion with id {promotionId} not found") { }
    }
}
