using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PKonnect.Models.Communities;
using System;
using System.Collections.Generic;
using System.Text;

namespace PKonnect.Mappers.Communities
{
    public class CommunityFeedbackMap
    {
        public CommunityFeedbackMap(EntityTypeBuilder<CommunityFeedback> entityBuilder)
        {
            entityBuilder.HasKey(t => t.CommunityFeedbackId);
            entityBuilder.Property(t => t.UserName).IsRequired();
            entityBuilder.Property(t => t.Email).IsRequired();
            entityBuilder.Property(t => t.Feedback).IsRequired();
        }
    }
}
