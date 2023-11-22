namespace Discounts.Backend.Dal.Exceptions
{
    public class ProductCategoryNotFoundException : NotFoundException
    {
        public ProductCategoryNotFoundException(int categoryId)
            : base($"Category with id {categoryId} not found") { }
    }
}
