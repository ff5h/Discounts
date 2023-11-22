using Discounts.Backend.Auth.Core.Dtos.Product;

namespace Discounts.Backend.Auth.Core.Interfaces
{
    public interface IProductService
    {
        Task<IReadOnlyCollection<ProductDto>> GetAllProductsAsync();
        Task CreateProductAsync(CreateProductDto dto);
        Task DeleteProductAsync(Guid productId);
    }
}
