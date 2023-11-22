using Discounts.Backend.Auth.Core.Dtos.Product;
using Discounts.Backend.Auth.Core.Dtos.Shop;

namespace Discounts.Backend.Auth.Core.Interfaces
{
    public interface IProductService
    {
        Task<IReadOnlyCollection<ProductDto>> GetAllProductsAsync();
        Task CreateProductAsync(CreateProductDto dto);
        Task DeleteProductAsync(Guid productId);
        Task<IReadOnlyCollection<ProductDto>> GetProductsByPromotionIdAsync(Guid promotionId);
        Task<IReadOnlyCollection<ProductDto>> GetProductsByPromotionIdAndCategoryIdAsync(Guid promotionId, int categoryId);
    }
}
