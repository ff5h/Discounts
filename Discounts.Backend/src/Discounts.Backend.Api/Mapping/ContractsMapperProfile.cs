using AutoMapper;
using Discounts.Backend.Api.Contracts.Company;
using Discounts.Backend.Auth.Core.Dtos.Company;

namespace Discounts.Backend.Api.Mapping
{
    public class ContractsMapperProfile : Profile
    {
        public ContractsMapperProfile()
        {
            CompanyMaps();
        }

        private void CompanyMaps()
        {
            CreateMap<CreateCompanyRequest, CreateCompanyDto>();
        }
    }
}
