namespace Discounts.Backend.Dal.Exceptions
{
    public class InvalidRefreshTokenException : BadRequestException
    {
        public InvalidRefreshTokenException() : base("Refresh token is invalid") { }
    }
}
