using System.ComponentModel.DataAnnotations;

namespace Discounts.Backend.Api.Contracts
{
    public class LoginRequest
    {
        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public required string Password { get; set; }
    }
}
