using Discounts.Backend.Dal.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Discounts.Backend.Dal.Configurations
{
    public class PromotionConfiguration : IEntityTypeConfiguration<Promotion>
    {
        public void Configure(EntityTypeBuilder<Promotion> builder)
        {
            builder.HasMany(x => x.Products)
            .WithOne(x => x.Promotion)
            .HasForeignKey(x => x.PromotionId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
