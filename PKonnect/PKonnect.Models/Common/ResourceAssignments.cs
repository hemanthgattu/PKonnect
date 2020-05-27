using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PKonnect.Models.Common
{
    public class ResourceAssignments
    {
        [Key]
        public long ResourceAssignmentId { get; set; }
        public long? ResourceId { get; set; }
        public long? ProjectMasterId { get; set; }
        public DateTimeOffset ModifiedDate { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public string SourceSystemName { get; set; }
        public string SourceSystemId { get; set; }
        public bool IsActive { get; set; }
    }
}
