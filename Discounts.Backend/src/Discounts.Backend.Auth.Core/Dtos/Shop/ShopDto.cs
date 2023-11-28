using Discounts.Backend.Auth.Core.Dtos.Promotion;

namespace Discounts.Backend.Auth.Core.Dtos.Shop
{
    public class ShopDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public double Rating { get; set; }
        public int AmountOfVote { get; set; }
        public DateTime OpenTime { get; set; }
        public DateTime CloseTime { get; set; }
        public required string City { get; set; }
        public required string Address { get; set; }

        public Guid CompanyId { get; set; }

        public ICollection<PromotionDto> Promotions { get; set; } = null!;
    }
}
