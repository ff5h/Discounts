using Discounts.Backend.Auth.Services.Dtos;
using Discounts.Backend.Auth.Services.Interfaces;
using Discounts.Backend.Dal;
using Discounts.Backend.Dal.Entities;
using Discounts.Backend.Dal.Exceptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Discounts.Backend.Auth.Services.Implementations;

public class AccountService : IAccountService
{
    private readonly TokenValidationParameters _tokenValidationParameters;
    private readonly JwtSecurityTokenHandler _tokenHandler;
    private readonly UserManager<User> _userManager;
    private readonly IJwtService _jwtService;
    private readonly AppDbContext _context;

    public AccountService(UserManager<User> userManager,
                          IJwtService jwtService,
                          TokenValidationParameters tokenValidationParameters,
                          JwtSecurityTokenHandler tokenHandler,
                          AppDbContext context)
    {
        _userManager = userManager;
        _jwtService = jwtService;
        _tokenValidationParameters = tokenValidationParameters;
        _tokenHandler = tokenHandler;
        _context = context;
    }

    public async Task RegisterAsync(RegisterDto dto)
    {
        var user = new User { Email = dto.Email, UserName = dto.Email };
        var result = await _userManager.CreateAsync(user, dto.Password);

        if (!result.Succeeded)
        {
            throw new RegisterBadRequestException(result.Errors.Select(x => x.Description));
        }
    }

    public async Task<TokensDto> LoginAsync(LoginDto dto, string applicationScheme)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);

        if (user == null)
        {
            throw new UserNotFoundException(dto.Email);
        }

        var result = await _userManager.CheckPasswordAsync(user, dto.Password);

        if (!result)
        {
            throw new LoginBadRequestException();
        }

        var roles = await _userManager.GetRolesAsync(user);

        var claims = new ClaimsIdentity(applicationScheme);

        claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id));
        claims.AddClaim(new Claim(ClaimTypes.Email, user.Email!));

        foreach (var role in roles)
        {
            claims.AddClaim(new Claim(ClaimTypes.Role, role));
        }

        return await RegenerateTokensAsync(claims);
    }

    public async Task<TokensDto> RefreshTokenAsync(string token, string applicationScheme)
    {
        var principles = ValidateToken(token);

        if (principles == null)
        {
            throw new InvalidRefreshTokenException();
        }

        var userIdClaim = principles.Claims.FirstOrDefault(x =>
            x.Type == ClaimTypes.NameIdentifier)!;

        var refreshToken = await GetRefreshTokenByIdAsync(userIdClaim.Value);

        if (refreshToken != token)
        {
            throw new RefreshTokenNotFoundException();
        }

        var emailClaim = principles.Claims.FirstOrDefault(x =>
            x.Type == ClaimTypes.Email)!;

        var rolesClaims = principles.Claims.Where(x =>
            x.Type == ClaimTypes.Role)!.ToList();

        var claims = new ClaimsIdentity(applicationScheme);

        claims.AddClaim(userIdClaim);
        claims.AddClaim(emailClaim);
        claims.AddClaims(rolesClaims);

        return await RegenerateTokensAsync(claims);
    }

    private ClaimsPrincipal? ValidateToken(string token)
    {
        ClaimsPrincipal principles;

        try
        {
            principles = _tokenHandler.ValidateToken(token, _tokenValidationParameters, out _);
        }
        catch
        {
            return null;
        }

        return principles;
    }

    private async Task<TokensDto> RegenerateTokensAsync(ClaimsIdentity claims)
    {
        string accessToken = _jwtService.GenerateJwt(claims);
        string refreshToken = _jwtService.GenerateRt(claims);

        var userId = claims.Claims.FirstOrDefault(x =>
            x.Type == ClaimTypes.NameIdentifier)!.Value;

        await StoreRefreshTokenByIdAsync(userId, refreshToken);
        await _context.SaveChangesAsync();

        return new TokensDto(accessToken, refreshToken);
    }

    private async Task StoreRefreshTokenByIdAsync(string id, string refreshToken)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
        {
            throw new UserNotFoundException(Guid.Parse(id));
        }
        user.RefreshToken = refreshToken;
    }

    private async Task<string?> GetRefreshTokenByIdAsync(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
        {
            throw new UserNotFoundException(Guid.Parse(id));
        }
        return user.RefreshToken;
    }
}