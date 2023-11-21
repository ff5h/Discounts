namespace Discounts.Backend.Auth.Services.Dtos;

public class RegisterDto
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}