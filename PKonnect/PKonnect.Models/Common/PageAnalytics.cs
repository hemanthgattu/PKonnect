using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PKonnect.Models.Common
{
    public class PageAnalytics
    {
        [Key]
        public long PageAnalyticsId { get; set; }
        public string ResourceEmailId { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public DateTimeOffset ModifiedDate { get; set; }
        public bool IsActive { get; set; }
    }
}
