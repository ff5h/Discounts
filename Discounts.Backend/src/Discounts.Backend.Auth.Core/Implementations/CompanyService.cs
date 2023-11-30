using AutoMapper;
using Discounts.Backend.Auth.Core.Dtos.Company;
using Discounts.Backend.Auth.Core.Interfaces;
using Discounts.Backend.Dal;
using Discounts.Backend.Dal.Entities;
using Discounts.Backend.Dal.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Discounts.Backend.Auth.Core.Implementations
{
    public class CompanyService : ICompanyService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public CompanyService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task CreateCompanyAsync(CreateCompanyDto dto)
        {
            var company = _mapper.Map<Company>(dto);
            await _context.AddAsync(company);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCompanyAsync(Guid companyId)
        {
            var company = await _context.Companies.FirstOrDefaultAsync(x => x.Id == companyId);
            if (company == null)
            {
                throw new CompanyNotFoundException(companyId);
            }
            _context.Remove(company);
            await _context.SaveChangesAsync();
        }

        public async Task<IReadOnlyCollection<CompanyDto>> GetAllCompaniesAsync()
        {
            var companies = await _context.Companies.Include(x => x.Shops).ToListAsync();
            var dtos = _mapper.Map<IReadOnlyCollection<CompanyDto>>(companies);
            foreach (var dto in dtos)
            {
                // Calculate the average rating for each shop
                var shopRatings = _context.Votes
                    .Where(vote => dto.ShopsId.Contains(vote.ShopId))
                    .GroupBy(vote => vote.ShopId)
                    .ToDictionary(group => group.Key, group => group.Average(vote => vote.Value));

                // Calculate the average rating for the company based on shop ratings
                if (shopRatings.Any())
                {
                    dto.Rating = shopRatings.Values.Average();
                }
                else
                {
                    dto.Rating = 0; // or set it to any default value
                }
            }
            return dtos;
        }
    }
}
