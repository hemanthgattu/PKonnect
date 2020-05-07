using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PKonnect.Models.Common
{
    public class EmployeeCertification
    {
        [Key]
        public long CertificationId { get; set; }
        public string CertificationName { get; set; }
        public DateTimeOffset ModifiedDate { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public bool IsActive { get; set; }

        public string SourceSystemName { get; set; }
        public string SourceSystemId { get; set; }
        public long EmployeeId { get; set; }
    }
}
