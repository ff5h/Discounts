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
            var entity = _mapper.Map<Company>(dto);
            await _context.AddAsync(entity);
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
            var companies = await _context.Companies.ToListAsync();
            return _mapper.Map<IReadOnlyCollection<CompanyDto>>(companies);
        }
    }
}
