using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PKonnect.Models.Common
{
    public class Employee
    {
        [Key]
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }

        public bool Gender { get; set; }
        public bool City { get; set; }
        public bool State { get; set; }
        public bool ZipCode { get; set; }
        public bool Country { get; set; }

        public string PrimaryEmailAddress { get; set; }
        public string SecondaryEmailAddress { get; set; }
        public string RecordType { get; set; }
        public string ReportsTo { get; set; }
        public string EmployeeID { get; set; }
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

    }
}
