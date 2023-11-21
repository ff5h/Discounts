namespace Discounts.Backend.Dal.Exceptions
{
    public class LoginBadRequestException : BadRequestException
    {
        public LoginBadRequestException() : base("Failed to login") { }
    }
}
