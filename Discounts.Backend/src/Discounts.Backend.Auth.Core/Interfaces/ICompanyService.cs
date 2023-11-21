using Discounts.Backend.Auth.Core.Dtos.Company;

namespace Discounts.Backend.Auth.Core.Interfaces
{
    public interface ICompanyService
    {
        Task<IReadOnlyCollection<CompanyDto>> GetAllCompaniesAsync();
        Task CreateCompanyAsync(CreateCompanyDto dto);
    }
}
