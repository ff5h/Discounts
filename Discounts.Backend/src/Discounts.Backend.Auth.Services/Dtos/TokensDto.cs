namespace Discounts.Backend.Auth.Services.Dtos;

public class TokensDto
{
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }

    public TokensDto(string accessToken, string refreshToken)
    {
        AccessToken = accessToken;
        RefreshToken = refreshToken;
    }
}