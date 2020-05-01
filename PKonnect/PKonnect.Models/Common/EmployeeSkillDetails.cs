using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PKonnect.Models.Common
{
    public class SkillDetails
    {
        public IQueryable<EmployeeSkillDetails> EmployeeSkillDetails { get; set; }
        public int RecordCount { get; set; }
    }


    public class EmployeeSkillDetails
    {
        public long EmployeeId { get; set; }
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

        public List<EmployeeSkillList> EmployeeSkills { get; set; }
    }

    public class EmployeeSkillList
    {

        //public long EmployeeId { get; set; }
        public long EmployeeSkillId { get; set; }
        public long SkillId { get; set; }
        public bool BestFitSkill { get; set; }
        public long SkillRating { get; set; }
        public string Contact { get; set; }
        public long LastYearUsed { get; set; }
        public string SkillGroup { get; set; }
        public string SkillType { get; set; }
        public string PracticeArea { get; set; }
        public string Term { get; set; }
        public string TextName { get; set; }


    }
}
