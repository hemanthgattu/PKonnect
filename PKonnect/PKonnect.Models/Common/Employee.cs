using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PKonnect.Models.Common
{
    public partial class Employee
    {
        //public Employee()
        //{
        //    EmployeeSkills = new HashSet<EmployeeSkill>();

        //}

        [Key]
        public long EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }

        public string Gender { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Country { get; set; }

        public string PrimaryEmailAddress { get; set; }
        public string SecondaryEmailAddress { get; set; }
        public string RecordType { get; set; }
        public string ReportsTo { get; set; }
        public string EmployeeNumber { get; set; }
        public string Category { get; set; }

        public string SiteCity { get; set; }
        public string SiteState { get; set; }
        public string EmployeeStatus { get; set; }
        public string ExperienceInYears { get; set; }
        public string EmployeeType { get; set; }
        public string EmployeeCountry { get; set; }

        public string PrimarySkill { get; set; }
        public string Title { get; set; }

        public string ServiceLine { get; set; }
        public DateTimeOffset ModifiedDate { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public bool IsActive { get; set; }

        public string SourceSystemName { get; set; }
        public string SourceSystemId { get; set; }
        public string RoleName { get; set; }
        public string OnBenchReason { get; set; }
        public long RoleId { get; set; }
        //public virtual ICollection<EmployeeSkill> EmployeeSkills { get; set; }


    }
}
