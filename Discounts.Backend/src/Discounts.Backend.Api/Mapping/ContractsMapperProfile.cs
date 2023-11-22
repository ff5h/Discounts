using AutoMapper;
using Discounts.Backend.Api.Contracts.Company;
using Discounts.Backend.Api.Contracts.Shop;
using Discounts.Backend.Auth.Core.Dtos.Company;
using Discounts.Backend.Auth.Core.Dtos.Shop;

namespace Discounts.Backend.Api.Mapping
{
    public class ContractsMapperProfile : Profile
    {
        public ContractsMapperProfile()
        {
            CompanyMaps();
            ShopMaps();
        }

        private void CompanyMaps()
        {
            CreateMap<CreateCompanyRequest, CreateCompanyDto>();
        }

        private void ShopMaps()
        {
            CreateMap<CreateShopRequest, CreateShopDto>();
        }
    }
}
