using AutoMapper;
using Discounts.Backend.Auth.Core.Dtos.Shop;
using Discounts.Backend.Auth.Core.Interfaces;
using Discounts.Backend.Dal;
using Discounts.Backend.Dal.Entities;
using Discounts.Backend.Dal.Exceptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Discounts.Backend.Auth.Core.Implementations
{
    public class ShopService : IShopService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public ShopService(AppDbContext context, IMapper mapper, UserManager<User> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }

        public async Task CreateShopAsync(CreateShopDto dto)
        {
            var company = await _context.Companies.FirstOrDefaultAsync(x => x.Id == dto.CompanyId);
            if (company == null)
            {
                throw new CompanyNotFoundException(dto.CompanyId);
            }
            var shop = _mapper.Map<Shop>(dto);
            await _context.AddAsync(shop);
            await _context.SaveChangesAsync();
        }

        public async Task VoteShopAsync(VoteShopDto dto)
        {
            var shop = await _context.Shops.FirstOrDefaultAsync(x => x.Id == dto.ShopId);
            if (shop == null)
            {
                throw new ShopNotFoundException(dto.ShopId);
            }

            var user = await _userManager.FindByIdAsync(dto.UserId);
            if (user == null)
            {
                throw new UserNotFoundException(dto.UserId);
            }

            if (dto.Value > 5 || dto.Value < 0)
            {
                throw new InvalidValueOFVote();
            }

            var vote = _mapper.Map<Vote>(dto);
            await _context.AddAsync(vote);
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
            var shops = await _context.Shops
                .Include(x => x.Promotions)
                .Include(x => x.Votes)
                .ToListAsync();

            var dtos = _mapper.Map<IReadOnlyCollection<ShopDto>>(shops);

            foreach (var dto in dtos)
            {
                var shop = shops.FirstOrDefault(s => s.Id == dto.Id);
                if (shop == null)
                {
                    throw new ShopNotFoundException(dto.Id);
                }

                foreach (var vote in shop.Votes)
                {
                    dto.AmountOfVote++;
                    dto.Rating += vote.Value;
                }

                if (dto.AmountOfVote > 0)
                {
                    dto.Rating = dto.Rating / dto.AmountOfVote;
                }
            }

            return dtos;
        }

        public async Task<ShopDto> GetShopByIdAsync(Guid shopId)
        {
            var shop = await _context.Shops
                .Include(x => x.Promotions)
                .Include(x => x.Votes)
                .FirstOrDefaultAsync(x => x.Id == shopId);

            if (shop == null)
            {
                throw new ShopNotFoundException(shopId);
            }

            var dto = _mapper.Map<ShopDto>(shop);

            foreach (var vote in shop.Votes)
            {
                dto.AmountOfVote++;
                dto.Rating += vote.Value;
            }

            if (dto.AmountOfVote > 0)
            {
                dto.Rating = dto.Rating / dto.AmountOfVote;
            }

            return dto;
        }

        public async Task<IReadOnlyCollection<ShopDto>> GetShopsByCompanyIdAndCityAsync(Guid companyId, string city)
        {
            var company = await _context.Companies.FirstOrDefaultAsync(x => x.Id == companyId);
            if (company == null)
            {
                throw new CompanyNotFoundException(companyId);
            }
            var shops = await _context.Shops
                .Include(x => x.Promotions)
                .Include(x => x.Votes)
                .Where(x => x.CompanyId == companyId && x.City == city)
                .ToListAsync();

            var dtos = _mapper.Map<IReadOnlyCollection<ShopDto>>(shops);

            foreach (var dto in dtos)
            {
                var shop = shops.FirstOrDefault(s => s.Id == dto.Id);
                if (shop == null)
                {
                    throw new ShopNotFoundException(dto.Id);
                }

                foreach (var vote in shop.Votes)
                {
                    dto.AmountOfVote++;
                    dto.Rating += vote.Value;
                }

                if (dto.AmountOfVote > 0)
                {
                    dto.Rating = dto.Rating / dto.AmountOfVote;
                }
            }

            return dtos;
        }

        public async Task<IReadOnlyCollection<ShopDto>> GetShopsByCompanyIdAsync(Guid companyId)
        {
            var company = await _context.Companies.FirstOrDefaultAsync(x => x.Id == companyId);
            if (company == null)
            {
                throw new CompanyNotFoundException(companyId);
            }
            var shops = await _context.Shops
                .Include(x => x.Promotions)
                .Include(x => x.Votes)
                .Where(x => x.CompanyId == companyId)
                .ToListAsync();

            var dtos = _mapper.Map<IReadOnlyCollection<ShopDto>>(shops);

            foreach (var dto in dtos)
            {
                var shop = shops.FirstOrDefault(s => s.Id == dto.Id);
                if (shop == null)
                {
                    throw new ShopNotFoundException(dto.Id);
                }

                foreach (var vote in shop.Votes)
                {
                    dto.AmountOfVote++;
                    dto.Rating += vote.Value;
                }

                if (dto.AmountOfVote > 0)
                {
                    dto.Rating = dto.Rating / dto.AmountOfVote;
                }
            }

            return dtos;
        }
    }
}
