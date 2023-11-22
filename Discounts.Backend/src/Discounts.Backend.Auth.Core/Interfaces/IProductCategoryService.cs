using Discounts.Backend.Auth.Core.Dtos.ProductCategory;

namespace Discounts.Backend.Auth.Core.Interfaces
{
    public interface IProductCategoryService
    {
        Task<IReadOnlyCollection<ProductCategoryDto>> GetAllCategoriesAsync();
        Task CreateCategoryAsync(CreateProductCategoryDto dto);
        Task DeleteCategoryAsync(int categoryId);
    }
}
