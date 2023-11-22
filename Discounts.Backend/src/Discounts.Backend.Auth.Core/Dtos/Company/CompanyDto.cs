namespace Discounts.Backend.Auth.Core.Dtos.Company
{
    public class CompanyDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string ImageUrl { get; set; }
        public double Rating { get; set; }
        public ICollection<Guid> ShopsId { get; set; } = null!;
    }
}
