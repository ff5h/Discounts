using AutoMapper;
using Discounts.Backend.Auth.Core.Dtos.Product;
using Discounts.Backend.Auth.Core.Interfaces;
using Discounts.Backend.Dal;
using Discounts.Backend.Dal.Entities;
using Discounts.Backend.Dal.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Discounts.Backend.Auth.Core.Implementations
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ProductService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task CreateProductAsync(CreateProductDto dto)
        {
            var promotion = await _context.Promotions.FirstOrDefaultAsync(x => x.Id == dto.PromotionId);
            if (promotion == null)
            {
                throw new PromotionNotFoundException(dto.PromotionId);
            }

            var category = await _context.ProductCategories.FirstOrDefaultAsync(x => x.Id == dto.CategoryId);
            if (category == null)
            {
                throw new ProductCategoryNotFoundException(dto.CategoryId);
            }

            var product = _mapper.Map<Product>(dto);
            await _context.AddAsync(product);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProductAsync(Guid productId)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == productId);
            if (product == null)
            {
                throw new ProductNotFoundException(productId);
            }
            _context.Remove(product);
            await _context.SaveChangesAsync();
        }

        public async Task<IReadOnlyCollection<ProductDto>> GetAllProductsAsync()
        {
            var promotions = await _context.Products.Include(x => x.Category).ToListAsync();
            return _mapper.Map<IReadOnlyCollection<ProductDto>>(promotions);
        }

        public async Task<IReadOnlyCollection<ProductDto>> GetProductsByPromotionIdAsync(Guid promotionId)
        {
            var promotion = await _context.Promotions.FirstOrDefaultAsync(x => x.Id == promotionId);
            if (promotion == null)
            {
                throw new PromotionNotFoundException(promotionId);
            }
            var shops = await _context.Products.Include(x => x.Category).Where(x => x.PromotionId == promotionId).ToListAsync();
            return _mapper.Map<IReadOnlyCollection<ProductDto>>(shops);
        }
    }
}
