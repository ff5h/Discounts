using Discounts.Backend.Auth.Services.Dtos;

namespace Discounts.Backend.Auth.Services.Interfaces;

public interface IAccountService
{
    Task RegisterAsync(RegisterDto dto);
    Task<TokensDto> LoginAsync(LoginDto dto, string applicationScheme);
    Task<TokensDto> RefreshTokenAsync(string token, string applicationScheme);
}