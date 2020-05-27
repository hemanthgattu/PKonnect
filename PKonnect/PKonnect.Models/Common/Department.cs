using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PKonnect.Models.Common
{
    public class Department
    {
        [Key]
        public long DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string DepartmentDescription { get; set; }
        public bool IsActive { get; set; }
    }
}
