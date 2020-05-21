﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PKonnect.Models.Common
{
    public class SkillDetails
    {
        public IQueryable<ResourceSkillDetails> EmployeeSkillDetails { get; set; }
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

        public List<ResourceSkillList> ResourceSkills { get; set; }
        public List<EmployeeCertification> EmployeeCertifications { get; set; }
    }

    public class ResourceSkillList
    {
        //public long EmployeeId { get; set; }
        public long ResourceSkillId { get; set; }
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