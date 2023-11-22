using AutoMapper;
using Discounts.Backend.Auth.Core.Dtos.Shop;
using Discounts.Backend.Auth.Core.Interfaces;
using Discounts.Backend.Dal;
using Discounts.Backend.Dal.Entities;
using Discounts.Backend.Dal.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Discounts.Backend.Auth.Core.Implementations
{
    public class ShopService : IShopService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ShopService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task CreateShopAsync(CreateShopDto dto)
        {
            dto.Rating = 5;
            var company = await _context.Companies.FirstOrDefaultAsync(x => x.Id == dto.CompanyId);
            if (company == null)
            {
                throw new CompanyNotFoundException(dto.CompanyId);
            }
            var shop = _mapper.Map<Shop>(dto);
            await _context.AddAsync(shop);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteShopAsync(Guid shopId)
        {
            var shop = await _context.Shops.FirstOrDefaultAsync(x => x.Id == shopId);
            if (shop == null)
            {
                throw new ShopNotFoundException(shopId);
            }
            _context.Remove(shop);
            await _context.SaveChangesAsync();
        }

        public async Task<IReadOnlyCollection<ShopDto>> GetAllShopsAsync()
        {
            var shops = await _context.Shops.ToListAsync();
            return _mapper.Map<IReadOnlyCollection<ShopDto>>(shops);
        }

        public async Task<IReadOnlyCollection<ShopDto>> GetShopsByCompanyIdAsync(Guid companyId)
        {
            var company = await _context.Companies.FirstOrDefaultAsync(x => x.Id == companyId);
            if (company == null)
            {
                throw new CompanyNotFoundException(companyId);
            }
            var shops = await _context.Shops.Where(x => x.CompanyId == companyId).ToListAsync();
            return _mapper.Map<IReadOnlyCollection<ShopDto>>(shops);
        }
    }
}
