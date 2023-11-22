using AutoMapper;
using Discounts.Backend.Api.Contracts.Promotion;
using Discounts.Backend.Auth.Core.Dtos.Promotion;
using Discounts.Backend.Auth.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Discounts.Backend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromotionController : ControllerBase
    {
        private readonly IPromotionService _promotionService;
        private readonly IMapper _mapper;

        public PromotionController(IPromotionService promotionService, IMapper mapper)
        {
            _promotionService = promotionService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var companies = await _promotionService.GetAllPromotionsAsync();
            return Ok(companies);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreatePromotionRequest request)
        {
            var dto = _mapper.Map<CreatePromotionDto>(request);
            await _promotionService.CreatePromotionAsync(dto);
            return StatusCode(201);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _promotionService.DeletePromotionAsync(id);
            return StatusCode(200);
        }
    }
}
