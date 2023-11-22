using AutoMapper;
using Discounts.Backend.Auth.Core.Dtos.ProductCategory;
using Discounts.Backend.Auth.Core.Dtos.Shop;
using Discounts.Backend.Auth.Core.Interfaces;
using Discounts.Backend.Dal;
using Discounts.Backend.Dal.Entities;
using Discounts.Backend.Dal.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Discounts.Backend.Auth.Core.Implementations
{
    public class ProductCategoryService : IProductCategoryService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ProductCategoryService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task CreateCategoryAsync(CreateProductCategoryDto dto)
        {
            var category = _mapper.Map<ProductCategory>(dto);
            await _context.AddAsync(category);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCategoryAsync(int categoryId)
        {
            var category = await _context.ProductCategories.FirstOrDefaultAsync(x => x.Id == categoryId);
            if (category == null)
            {
                throw new ProductCategoryNotFoundException(categoryId);
            }
            _context.Remove(category);
            await _context.SaveChangesAsync();
        }

        public async Task<IReadOnlyCollection<ProductCategoryDto>> GetAllCategoriesAsync()
        {
            var categories = await _context.ProductCategories.ToListAsync();
            return _mapper.Map<IReadOnlyCollection<ProductCategoryDto>>(categories);
        }
    }
}
