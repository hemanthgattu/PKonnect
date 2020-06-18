using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PKonnect.Models.Common
{
    public class Certifications
    {
        [Key]
        public long CertificationId { get; set; }
        public string CertificationName { get; set; }
        public string CertificationNumber { get; set; }
        public long? CertificationVendorId { get; set; }
        public string SourceSystemName { get; set; }
        public string SourceSystemId { get; set; }
        public DateTimeOffset? CreatedDate { get; set; }
        public DateTimeOffset? ModifiedDate { get; set; }
        public bool IsActive { get; set; }

    }
}
