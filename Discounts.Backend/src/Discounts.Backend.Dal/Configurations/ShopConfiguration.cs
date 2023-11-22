using Discounts.Backend.Dal.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Discounts.Backend.Dal.Configurations
{
    public class ShopConfiguration : IEntityTypeConfiguration<Shop>
    {
        public void Configure(EntityTypeBuilder<Shop> builder)
        {
            builder.HasMany(x => x.Promotions)
            .WithOne(x => x.Shop)
            .HasForeignKey(x => x.ShopId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
