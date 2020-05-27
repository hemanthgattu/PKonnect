using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PKonnect.Models.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace PKonnect.Mappers.Common
{
    public class ProjectMasterMap
    {
        public ProjectMasterMap(EntityTypeBuilder<ProjectMaster> entityBuilder)
        {
            entityBuilder.HasKey(t => t.ProjectMasterId);
        }
    }
}
