﻿using AutoMapper;
using Discounts.Backend.Api.Contracts.Company;
using Discounts.Backend.Api.Contracts.Product;
using Discounts.Backend.Api.Contracts.ProductCategory;
using Discounts.Backend.Api.Contracts.Promotion;
using Discounts.Backend.Api.Contracts.Shop;
using Discounts.Backend.Auth.Core.Dtos.Company;
using Discounts.Backend.Auth.Core.Dtos.Product;
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
            ProductMaps();
        }

        private void CompanyMaps()
        {
            CreateMap<CreateCompanyRequest, CreateCompanyDto>();
        }

        private void ShopMaps()
        {
            CreateMap<CreateShopRequest, CreateShopDto>();
            CreateMap<VoteShopRequest, VoteShopDto>();
        }

        private void PromotionMaps()
        {
            CreateMap<CreatePromotionRequest, CreatePromotionDto>();
        }

        private void CategoryMaps()
        {
            CreateMap<CreateProductCategoryRequest, CreateProductCategoryDto>();
        }

        private void ProductMaps()
        {
            CreateMap<CreateProductRequest, CreateProductDto>();
        }
    }
}
