using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PKonnect.Models.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace PKonnect.Mappers.Common
{
    public class EmployeeRoleMap
    {
        public EmployeeRoleMap(EntityTypeBuilder<EmployeeRole> entityBuilder)
        {
            entityBuilder.HasKey(t => t.EmployeeRoleId);
        }        
    }
}
