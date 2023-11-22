using AutoMapper;
using Discounts.Backend.Api.Contracts.Product;
using Discounts.Backend.Auth.Core.Dtos.Product;
using Discounts.Backend.Auth.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Discounts.Backend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductController(IProductService productService, IMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _productService.GetAllProductsAsync();
            return Ok(categories);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateProductRequest request)
        {
            var dto = _mapper.Map<CreateProductDto>(request);
            await _productService.CreateProductAsync(dto);
            return StatusCode(201);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _productService.DeleteProductAsync(id);
            return StatusCode(200);
        }

        [HttpGet]
        [Route("promotion/{promotionId}")]
        public async Task<IActionResult> GetsByPromotionId(Guid promotionId)
        {
            var products = await _productService.GetProductsByPromotionIdAsync(promotionId);
            return Ok(products);
        }
    }
}
