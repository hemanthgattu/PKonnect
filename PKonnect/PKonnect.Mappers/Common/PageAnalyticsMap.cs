using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PKonnect.Models.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace PKonnect.Mappers.Common
{
    public class PageAnalyticsMap
    {
        public PageAnalyticsMap(EntityTypeBuilder<PageAnalytics> entityBuilder)
        {
            entityBuilder.HasKey(t => t.PageAnalyticsId);
        }
    }
}