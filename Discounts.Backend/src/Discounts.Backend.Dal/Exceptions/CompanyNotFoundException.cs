namespace Discounts.Backend.Dal.Exceptions;

public class CompanyNotFoundException : NotFoundException
{
	public CompanyNotFoundException(Guid ponterId)
		: base($"Company with id {ponterId} not found") { }
}