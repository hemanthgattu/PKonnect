using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PKonnect.Models.Common
{
    public class ProjectMaster
    {
        [Key]
        public long ProjectMasterId { get; set; }
        public string ProjectName { get; set; }
        public bool IsActive { get; set; }
        public string AccountName { get; set; }
        public string Location { get; set; }
        public string ProjectStatus { get; set; }
        public DateTimeOffset ModifiedDate { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public string SourceSystemName { get; set; }
        public string SourceSystemId { get; set; }
    }
}
