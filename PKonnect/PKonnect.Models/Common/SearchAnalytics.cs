using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PKonnect.Models.Common
{
    public class SearchAnalytics
    {
        [Key]
        public long SearchAnalyticsId { get; set; }
        public string EmployeeEmailId { get; set; }
        public string QueryString { get; set; }
        public string Role { get; set; }
        public string SkillNames { get; set; }
        public string EmployeeName { get; set; }
        public string ResourceStatus { get; set; }
        public string Location { get; set; }
        public DateTimeOffset ModifiedDate { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public bool IsActive { get; set; }
        public long PageNumber { get; set; }
    }
}
