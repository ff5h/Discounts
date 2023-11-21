using System.Security.Claims;

namespace Discounts.Backend.Auth.Services.Interfaces;

public interface IJwtService
{
    string GenerateJwt(ClaimsIdentity claims);
    string GenerateRt(ClaimsIdentity claims);
}