using AutoMapper;
using Discounts.Backend.Auth.Core.Dtos.Company;
using Discounts.Backend.Auth.Core.Dtos.Promotion;
using Discounts.Backend.Auth.Core.Interfaces;
using Discounts.Backend.Dal;
using Discounts.Backend.Dal.Entities;
using Discounts.Backend.Dal.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Discounts.Backend.Auth.Core.Implementations
{
    public class PromotionService : IPromotionService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public PromotionService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task CreatePromotionAsync(CreatePromotionDto dto)
        {
            var shop = await _context.Shops.FirstOrDefaultAsync(x => x.Id == dto.ShopId);
            if (shop == null)
            {
                throw new ShopNotFoundException(dto.ShopId);
            }
            var promotion = _mapper.Map<Promotion>(dto);
            await _context.AddAsync(promotion);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePromotionAsync(Guid promotionId)
        {
            var promotion = await _context.Promotions.FirstOrDefaultAsync(x => x.Id == promotionId);
            if (promotion == null)
            {
                throw new PromotionNotFoundException(promotionId);
            }
            _context.Remove(promotion);
            await _context.SaveChangesAsync();
        }

        public async Task<IReadOnlyCollection<PromotionDto>> GetAllPromotionsAsync()
        {
            var promotions = await _context.Promotions.ToListAsync();
            return _mapper.Map<IReadOnlyCollection<PromotionDto>>(promotions);
        }
    }
}
