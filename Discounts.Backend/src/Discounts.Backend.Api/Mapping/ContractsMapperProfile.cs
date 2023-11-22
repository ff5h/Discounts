using AutoMapper;
using Discounts.Backend.Api.Contracts.Company;
using Discounts.Backend.Api.Contracts.ProductCategory;
using Discounts.Backend.Api.Contracts.Promotion;
using Discounts.Backend.Api.Contracts.Shop;
using Discounts.Backend.Auth.Core.Dtos.Company;
using Discounts.Backend.Auth.Core.Dtos.ProductCategory;
using Discounts.Backend.Auth.Core.Dtos.Promotion;
using Discounts.Backend.Auth.Core.Dtos.Shop;

namespace Discounts.Backend.Api.Mapping
{
    public class ContractsMapperProfile : Profile
    {
        public ContractsMapperProfile()
        {
            CompanyMaps();
            ShopMaps();
            PromotionMaps();
            CategoryMaps();
        }

        private void CompanyMaps()
        {
            CreateMap<CreateCompanyRequest, CreateCompanyDto>();
        }

        private void ShopMaps()
        {
            CreateMap<CreateShopRequest, CreateShopDto>();
        }

        private void PromotionMaps()
        {
            CreateMap<CreatePromotionRequest, CreatePromotionDto>();
        }

        private void CategoryMaps()
        {
            CreateMap<CreateProductCategoryRequest, CreateProductCategoryDto>();
        }
    }
}
