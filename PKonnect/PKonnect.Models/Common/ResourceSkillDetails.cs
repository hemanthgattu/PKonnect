using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PKonnect.Models.Common
{
    public class SkillDetails
    {
        public IQueryable<ResourceSkillDetails> ResourceSkillDetails { get; set; }
        public int RecordCount { get; set; }
    }


    public class ResourceSkillDetails
    {
        public long ResourceId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Country { get; set; }
        public string Role { get; set; }
        public bool OnProject { get; set; }
        public string ResourceStatus { get; set; }
        public string RoleDescription { get; set; }
        public bool IsMvp { get; set; }
        public bool IsAvailable { get; set; }
        public string Mentor { get; set; }
        public DateTimeOffset? HiredDate { get; set; }
        public string EmployeeLocation { get; set; }
        public string Manager { get; set; }
        public string COE { get; set; }
        public string AboutEmployee { get; set; }
        public string EmployeeId { get; set; }
        public long? DepartmentId { get; set; }
        public string DepartmentName { get; set; }

        public List<ResourceSkillList> ResourceSkills { get; set; }
        public List<ResourceCertificationsList> ResourceCertifications { get; set; }
    }

    public class ResourceSkillList
    {
        //public long EmployeeId { get; set; }
        public long ResourceSkillId { get; set; }
        public long? SkillId { get; set; }
        public bool BestFitSkill { get; set; }
        public long? SkillRating { get; set; }
        public string Contact { get; set; }
        public long? LastYearUsed { get; set; }
        public string SkillGroup { get; set; }
        public string SkillType { get; set; }
        public string PracticeArea { get; set; }
        public string Term { get; set; }
        public string TextName { get; set; }
    }

    public class ResourceCertificationsList
    {
        
        public long ResourceCertificationId { get; set; }        
        public long? CertificationId { get; set; }
        public string LicenseNumber { get; set; }
        public DateTime AchivedDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public string VendorName { get; set; }
        public string CertificationName { get; set; }
        public string CertificationNumber { get; set; }
    }
}
