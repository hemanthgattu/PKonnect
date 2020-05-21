using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PKonnect.Models.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace PKonnect.Mappers.Common
{
    public class ResourcesMap
    {
        public ResourcesMap(EntityTypeBuilder<Resources> entityBuilder)
        {
            entityBuilder.HasKey(t => t.ResourceId);
            entityBuilder.Property(t => t.FirstName).IsRequired();
            entityBuilder.Property(t => t.LastName).IsRequired();
        }
    }
}