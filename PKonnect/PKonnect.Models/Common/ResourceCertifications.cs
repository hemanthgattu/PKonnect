using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PKonnect.Models.Common
{
    public class ResourceCertifications
    {
        [Key]
        public long ResourceCertificationId { get; set; }
        public long ResourceId { get; set; }
        public long CertificationId { get; set; }
        public string LicenseNumber { get; set; }
        public DateTime AchivedDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public string Notes { get; set; }
        public string SourceSystemName { get; set; }
        public string SourceSystemId { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public DateTimeOffset ModifiedDate { get; set; }
        public bool IsActive { get; set; }
    }
}
