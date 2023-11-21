using Discounts.Backend.Api.Contracts;
using Discounts.Backend.Auth.Services.Dtos;
using Discounts.Backend.Auth.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Discounts.Backend.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var dto = new RegisterDto { Email = request.Email, Password = request.Password };
            await _accountService.RegisterAsync(dto);
            return StatusCode(201);
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var dto = new LoginDto { Email = request.Email, Password = request.Password };
            var token = await _accountService.LoginAsync(dto, IdentityConstants.ApplicationScheme);
            return Ok(token);
        }

        [HttpPost]
        [Route("refresh-token")]
        [AllowAnonymous]
        public async Task<IActionResult> RefreshTokens([FromBody] string token)
        {
            var result = await _accountService.RefreshTokenAsync(token, IdentityConstants.ApplicationScheme);
            return Ok(result);
        }
    }
}
