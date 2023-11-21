using Microsoft.IdentityModel.Tokens;

namespace Discounts.Backend.Auth.Services.Interfaces;

public interface IJwtConfiguration
{
    SecurityKey SecurityKey { get; }
    string Issuer { get; }
    string Audience { get; }
    TimeSpan LifeTime { get; }
}