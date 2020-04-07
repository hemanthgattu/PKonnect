using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PKonnect.Models.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace PKonnect.Mappers.Common
{
    public class SkillMap
    {
        public SkillMap(EntityTypeBuilder<Skill> entityBuilder)
        {
            entityBuilder.HasKey(t => t.SkillId);
        }
    }
}
