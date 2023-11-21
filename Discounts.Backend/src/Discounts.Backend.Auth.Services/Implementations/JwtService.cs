using Discounts.Backend.Auth.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Discounts.Backend.Auth.Services.Implementations;

public class JwtService : IJwtService
{
    private readonly JwtSecurityTokenHandler _tokenHandler;
    private readonly IJwtConfiguration _jwtConfiguration;
    private readonly IRtConfiguration _rtConfiguration;

    public JwtService(JwtSecurityTokenHandler tokenHandler, IJwtConfiguration jwtConfiguration, IRtConfiguration rtConfiguration)
    {
        _tokenHandler = tokenHandler;
        _jwtConfiguration = jwtConfiguration;
        _rtConfiguration = rtConfiguration;
    }

    public string GenerateJwt(ClaimsIdentity claims)
    {
        var credentials = new SigningCredentials(_jwtConfiguration.SecurityKey, SecurityAlgorithms.HmacSha256);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = claims,
            Issuer = _jwtConfiguration.Issuer,
            Audience = _jwtConfiguration.Audience,
            Expires = DateTime.UtcNow.Add(_jwtConfiguration.LifeTime),
            SigningCredentials = credentials
        };

        var token = _tokenHandler.CreateToken(tokenDescriptor);

        return _tokenHandler.WriteToken(token);
    }

    public string GenerateRt(ClaimsIdentity claims)
    {
        var credentials = new SigningCredentials(_rtConfiguration.SecurityKey, SecurityAlgorithms.HmacSha256);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = claims,
            Issuer = _rtConfiguration.Issuer,
            Audience = _rtConfiguration.Audience,
            Expires = DateTime.UtcNow.Add(_rtConfiguration.LifeTime),
            SigningCredentials = credentials
        };

        var token = _tokenHandler.CreateToken(tokenDescriptor);

        return _tokenHandler.WriteToken(token);
    }
}