namespace Discounts.Backend.Auth.Core.Dtos.Shop
{
    public class CreateShopDto
    {
        public required string Name { get; set; }
        public DateTime OpenTime { get; set; }
        public DateTime CloseTime { get; set; }
        public required string City { get; set; }
        public required string Address { get; set; }
        public required string ImageUrl { get; set; }

        public Guid CompanyId { get; set; }
    }
}
