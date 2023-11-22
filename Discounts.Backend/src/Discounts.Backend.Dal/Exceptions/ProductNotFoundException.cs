namespace Discounts.Backend.Dal.Exceptions
{
    public class ProductNotFoundException : NotFoundException
    {
        public ProductNotFoundException(Guid productId)
            : base($"Product with id {productId} not found") { }
    }
}
