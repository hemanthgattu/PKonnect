using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PKonnect.Models.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace PKonnect.Mappers.Common
{
    public class EmployeeSkillMap
    {
        public EmployeeSkillMap(EntityTypeBuilder<EmployeeSkill> entityBuilder)
        {
            entityBuilder.HasKey(t => t.EmployeeSkillId);
            entityBuilder.Property(t => t.EmployeeId).IsRequired();
            entityBuilder.Property(t => t.SkillId).IsRequired();
        }
    }
}
