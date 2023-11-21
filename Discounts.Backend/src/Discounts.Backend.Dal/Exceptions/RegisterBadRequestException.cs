namespace Discounts.Backend.Dal.Exceptions
{
    public class RegisterBadRequestException : BadRequestException
    {
        public RegisterBadRequestException(IEnumerable<string> errors)
            : base(String.Join(",", errors)) { }
    }
}
