using AutoMapper;
using Discounts.Backend.Auth.Core.Dtos.Company;
using Discounts.Backend.Auth.Core.Dtos.Promotion;
using Discounts.Backend.Auth.Core.Dtos.Shop;
using Discounts.Backend.Dal.Entities;

namespace Discounts.Backend.Auth.Core.Mapping
{
    public class EntitiesMapperProfile : Profile
    {
        public EntitiesMapperProfile()
        {
            CompanyMaps();
            ShopMaps();
            PromotionMaps();
        }

        private void CompanyMaps()
        {
            CreateMap<CreateCompanyDto, Company>();
            CreateMap<Company, CompanyDto>()
                .ForMember(dest => dest.ShopsId, opt => opt.MapFrom(src => src.Shops.Select(shop => shop.Id)));
        }

        private void ShopMaps()
        {
            CreateMap<CreateShopDto, Shop>();
            CreateMap<Shop, ShopDto>()
                .ForMember(dest => dest.Promotions, opt => opt.MapFrom(src => src.Promotions));
            
        }

        private void PromotionMaps()
        {
            CreateMap<Promotion, PromotionDto>();
            CreateMap<CreatePromotionDto, Promotion>();
        }
    }
}
