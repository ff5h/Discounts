namespace Discounts.Backend.Dal.Exceptions
{
    public sealed class UserNotFoundException : NotFoundException
    {
        public UserNotFoundException(string email)
            : base($"User with email {email} not found") { }

        public UserNotFoundException(Guid id)
            : base($"User with identifier {id} not found") { }
    }
}
