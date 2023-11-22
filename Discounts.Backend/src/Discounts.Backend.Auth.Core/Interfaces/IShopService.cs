using Discounts.Backend.Auth.Core.Dtos.Shop;

namespace Discounts.Backend.Auth.Core.Interfaces
{
    public interface IShopService
    {
        Task<IReadOnlyCollection<ShopDto>> GetAllShopsAsync();
        Task<IReadOnlyCollection<ShopDto>> GetShopsByCompanyIdAsync(Guid companyId);
        Task CreateShopAsync(CreateShopDto dto);
        Task DeleteShopAsync(Guid shopId);
    }
}
