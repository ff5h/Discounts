using AutoMapper;
using Discounts.Backend.Api.Contracts.Shop;
using Discounts.Backend.Auth.Core.Dtos.Shop;
using Discounts.Backend.Auth.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Discounts.Backend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopController : ControllerBase
    {
        private readonly IShopService _shopService;
        private readonly IMapper _mapper;

        public ShopController(IShopService shopService, IMapper mapper)
        {
            _shopService = shopService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var companies = await _shopService.GetAllShopsAsync();
            return Ok(companies);
        }

        [HttpGet]
        [Route("company/{companyId}")]
        public async Task<IActionResult> GetsByCompanyId(Guid companyId)
        {
            var companies = await _shopService.GetShopsByCompanyIdAsync(companyId);
            return Ok(companies);
        }

        [HttpGet]
        [Route("company/{companyId}/city/{city}")]
        public async Task<IActionResult> GetsByCompanyIdAndCity(Guid companyId, string city)
        {
            var companies = await _shopService.GetShopsByCompanyIdAndCityAsync(companyId, city);
            return Ok(companies);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var company = await _shopService.GetShopByIdAsync(id);
            return Ok(company);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateShopRequest request)
        {
            var dto = _mapper.Map<CreateShopDto>(request);
            await _shopService.CreateShopAsync(dto);
            return StatusCode(201);
        }

        [HttpPost]
        [Route("vote")]
        public async Task<IActionResult> Vote(VoteShopRequest request)
        {
            var dto = _mapper.Map<VoteShopDto>(request);
            await _shopService.VoteShopAsync(dto);
            return StatusCode(201);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _shopService.DeleteShopAsync(id);
            return StatusCode(200);
        }
    }
}
