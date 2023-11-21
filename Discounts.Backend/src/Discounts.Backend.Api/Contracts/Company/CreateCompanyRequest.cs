namespace Discounts.Backend.Api.Contracts.Company
{
    public class CreateCompanyRequest
    {
        public required string Name { get; set; }
        public required string ImageUrl { get; set; }
    }
}
