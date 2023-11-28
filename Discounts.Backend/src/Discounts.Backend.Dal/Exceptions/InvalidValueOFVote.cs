namespace Discounts.Backend.Dal.Exceptions
{
    public class InvalidValueOFVote : BadRequestException
    {
        public InvalidValueOFVote()
            : base("Invalid value of vote. Valid is from 0 to 5") { }
    }
}
