namespace Discounts.Backend.Dal.Exceptions
{
    public class RefreshTokenNotFoundException : NotFoundException
    {
        public RefreshTokenNotFoundException() : base("Refresh token does not belong to the user") { }
    }
}
