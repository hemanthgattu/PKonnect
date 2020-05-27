using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PKonnect.Models.Common
{
    public partial class Resources
    {
        public Resources()
        {
            //EmployeeSkills = new HashSet<ResourceSkills>();
            //EmployeeCertification = new HashSet<EmployeeCertification>();

        }

        [Key]
        public long ResourceId { get; set; }
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
        public string EmployeeId { get; set; }
        public string Category { get; set; }

        public string SiteCity { get; set; }
        public string SiteState { get; set; }

        public string SiteZipCode { get; set; }
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
        public long? RoleId { get; set; }

        public string ResourceStatus { get; set; }
        //public virtual ICollection<ResourceSkills> EmployeeSkills { get; set; }
        //public virtual ICollection<EmployeeCertification> EmployeeCertification { get; set; }
        public string IntacctLocationName { get; set; }
        public long? IntacctLocationId { get; set; }

        public bool IsMvp { get; set; }
        public bool IsAvailable { get; set; }
        public string Mentor { get; set; }
        public DateTimeOffset? HiredDate { get; set; }
        public string EmployeeLocation { get; set; }
        public string Manager { get; set; }
        public string COE { get; set; }
        public string AboutEmployee { get; set; }
        public long? DepartmentId { get; set; }
        public string DepartmentName { get; set; }
    }
}
