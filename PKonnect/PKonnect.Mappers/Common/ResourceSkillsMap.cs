using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PKonnect.Models.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace PKonnect.Mappers.Common
{
    public class ResourceSkillsMap
    {
        public ResourceSkillsMap(EntityTypeBuilder<ResourceSkills> entityBuilder)
        {
            entityBuilder.HasKey(t => t.ResourceSkillId);
            entityBuilder.Property(t => t.ResourceId).IsRequired();
            entityBuilder.Property(t => t.SkillId).IsRequired();
        }
    }
}
