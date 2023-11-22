﻿namespace Discounts.Backend.Auth.Core.Dtos.Promotion
{
    public class PromotionDto
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
