using AutoMapper;
using Discounts.Backend.Api.Contracts.Company;
using Discounts.Backend.Api.Contracts.ProductCategory;
using Discounts.Backend.Auth.Core.Dtos.Company;
using Discounts.Backend.Auth.Core.Dtos.ProductCategory;
using Discounts.Backend.Auth.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Discounts.Backend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoryController : ControllerBase
    {
        private readonly IProductCategoryService _productCategoryService;
        private readonly IMapper _mapper;

        public ProductCategoryController(IProductCategoryService productCategoryService, IMapper mapper)
        {
            _productCategoryService = productCategoryService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _productCategoryService.GetAllCategoriesAsync();
            return Ok(categories);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateProductCategoryRequest request)
        {
            var dto = _mapper.Map<CreateProductCategoryDto>(request);
            await _productCategoryService.CreateCategoryAsync(dto);
            return StatusCode(201);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await _productCategoryService.DeleteCategoryAsync(id);
            return StatusCode(200);
        }
    }
}
