using Microsoft.AspNetCore.Identity;

namespace Discounts.Backend.Dal.Entities
{
    public class User : IdentityUser
    {
        public string? RefreshToken { get; set; }
    }
}
