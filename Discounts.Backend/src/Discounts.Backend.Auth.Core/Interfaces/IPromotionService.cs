using Discounts.Backend.Auth.Core.Dtos.Promotion;

namespace Discounts.Backend.Auth.Core.Interfaces
{
    public interface IPromotionService
    {
        Task<IReadOnlyCollection<PromotionDto>> GetAllPromotionsAsync();
        Task CreatePromotionAsync(CreatePromotionDto dto);
        Task DeletePromotionAsync(Guid promotionId);
    }
}
