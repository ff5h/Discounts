using Discounts.Backend.Auth.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Discounts.Backend.Api.Configurations
{
    public class JwtConfiguration : IJwtConfiguration
    {
        public string Secret { get; }
        public string Issuer { get; }
        public string Audience { get; }
        public TimeSpan LifeTime { get; }
        public SecurityKey SecurityKey => new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Secret));

        public JwtConfiguration(string secret, string issuer, string audience, TimeSpan lifeTime)
        {
            Secret = secret;
            Issuer = issuer;
            Audience = audience;
            LifeTime = lifeTime;
        }
    }
}
