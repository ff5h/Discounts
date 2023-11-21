using AutoMapper;
using Discounts.Backend.Auth.Core.Dtos.Company;
using Discounts.Backend.Dal.Entities;

namespace Discounts.Backend.Auth.Core.Mapping
{
    public class EntitiesMapperProfile : Profile
    {
        public EntitiesMapperProfile()
        {
            CompanyMaps();
        }

        private void CompanyMaps()
        {
            CreateMap<CreateCompanyDto, Company>();
            CreateMap<Company, CompanyDto>();
        }
    }
}
