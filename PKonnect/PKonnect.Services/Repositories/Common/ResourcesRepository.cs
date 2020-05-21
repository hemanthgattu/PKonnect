﻿using Microsoft.EntityFrameworkCore;
using PKonnect.Context;
using PKonnect.Models.Common;
using PKonnect.Services.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PKonnect.Services.DataServices
{
    public class ResourcesRepository : IResourcesRepository

    {
        private readonly PKonnectDataContext _pkonnectdatacontext;

        public ResourcesRepository(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }

        public int AddResource(Resources employee)
        {
            _pkonnectdatacontext.Resources.Add(employee);
            int employeeId = _pkonnectdatacontext.SaveChanges();
            return employeeId;
        }


        public IQueryable<Resources> GetResources()
        {
            if (_pkonnectdatacontext != null)
            {
                try
                {
                    return _pkonnectdatacontext.Resources.Where(Resource => Resource.IsActive).AsNoTracking();
                }
                catch (Exception ex)
                {

                }
            }

            return null;
        }

        public object GetResourceDetails(long? resourceId,string skillNames, string employeeName, string role, string resourceStatus, string location, string email, int pageSize, int pageNumber)
        {
            if (_pkonnectdatacontext != null)
            {
                SearchAnalytics analytics = new SearchAnalytics
                {
                    EmployeeEmailId = email,
                    Role = role,
                    SkillNames = skillNames,
                    ResourceStatus = resourceStatus,
                    Location = location,
                    IsActive = true,
                    CreatedDate = DateTime.Now,
                    PageNumber = pageNumber
                };

                _pkonnectdatacontext.SearchAnalytics.Add(analytics);
                // executes the appropriate commands to implement the changes to the database  
                _pkonnectdatacontext.SaveChanges();


                string[] SkillNames = new string[] { };
                string[] locations = new string[] { };

                if (!string.IsNullOrEmpty(skillNames))
                    SkillNames = skillNames.Split(',');

                if (!string.IsNullOrEmpty(location))
                    locations = location.Split(',');

                var roles = (from r in _pkonnectdatacontext.Roles
                             where (role == null || (r.RoleName == role)) && r.IsActive
                             select new
                             {
                                 r.RoleId,
                                 r.RoleGroup,
                                 r.RoleName
                             }).ToList();


                var skills = (from s in _pkonnectdatacontext.Skill
                              where (skillNames == null || (SkillNames.Contains(s.TextName))) && s.IsActive
                              select new
                              {
                                  s.SkillGroup,
                                  s.SkillType,
                                  s.SkillId,
                                  s.TextName,
                              }).ToList();

                var details = (from employee in _pkonnectdatacontext.Resources
                               join employeeRole in _pkonnectdatacontext.Roles
                                on employee.RoleId  equals employeeRole.RoleId into ER
                               from employeeRole in ER.DefaultIfEmpty()
                               join intacct in _pkonnectdatacontext.IntacctLocation
                               on employee.IntacctLocationId equals intacct.IntacctLocationId                               
                               where
                               (employeeName == null || (employee.FullName == employeeName)) && employee.IsActive
                               && (resourceId == null || (employee.ResourceId == resourceId))
                                && (resourceStatus == null || (employee.ResourceStatus == resourceStatus))
                              && (role == null || (employeeRole.RoleName == role))
                              &&
                              (location == null || (intacct.Country == location))
                              && employee.IsActive
                            
                               select new ResourceSkillDetails()
                               {
                                   ResourceId = employee.ResourceId,
                                   FirstName = employee.FirstName,
                                   LastName = employee.LastName,
                                   FullName = employee.FullName,
                                   Email = employee.PrimaryEmailAddress,
                                   Gender = employee.Gender,
                                   City = employee.SiteCity,
                                   State = employee.SiteState,
                                   Country = employee.Country,
                                   Role = employeeRole.RoleName,
                                   RoleDescription = employeeRole.RoleDescription,
                                   ResourceStatus = employee.ResourceStatus,
                                   OnProject = (employee.ResourceStatus == "On Project" ? true : false),
                                   IsMvp = employee.IsMvp,
                                   IsAvailable = employee.IsAvailable,
                                   Mentor = employee.Mentor,
                                   HiredDate = employee.HiredDate,
                                   EmployeeLocation = employee.EmployeeLocation,
                                   Manager = employee.Manager,
                                   COE = employee.COE,
                                   AboutEmployee = employee.AboutEmployee,
                                   EmployeeId = employee.EmployeeId,
                                   ResourceSkills = (from es in _pkonnectdatacontext.ResourceSkills
                                                     join s in _pkonnectdatacontext.Skill
                                                    on es.SkillId equals s.SkillId into empSkill
                                                     from emps in empSkill.DefaultIfEmpty()
                                                     where (es.ResourceId == employee.ResourceId) && es.IsActive
                                                        && es.BestFitSkill
                                                     orderby es.SkillRating descending
                                                     //&& (skillName == null || (SkillNames.Contains(emps.TextName))))
                                                     select new ResourceSkillList()
                                                     {
                                                         ResourceSkillId = es.ResourceSkillId,
                                                         BestFitSkill = es.BestFitSkill,
                                                         TextName = emps.TextName,
                                                         SkillRating = es.SkillRating,
                                                         LastYearUsed = es.LastYearUsed,
                                                         SkillGroup = emps.SkillGroup,
                                                         SkillType = emps.SkillType,
                                                         SkillId = es.SkillId
                                                     }
                                                     ).ToList(),
                                   EmployeeCertifications = (from ec in _pkonnectdatacontext.EmployeeCertification
                                                             where ec.EmployeeId == employee.ResourceId
                                                             select ec).ToList()
                               }).ToList();

                var details1 = details.Where(d => d.ResourceSkills.Any(y => (skillNames == null || (SkillNames.Contains(y.TextName))))).ToList();

                var details2 = details.Where(d => d.ResourceSkills.Count == 0).ToList();

                details = details1.Union(details2).ToList();

                var employeeSkills = details.Where(a => a.ResourceSkills.Any()).ToList().AsQueryable().Skip((pageNumber - 1) * pageSize).Take(pageSize);
                var recordCount = employeeSkills.Count() < 10 ? employeeSkills.Count() : details.Count();

                var skillDetails = new SkillDetails
                {
                    EmployeeSkillDetails = employeeSkills,
                    RecordCount = recordCount
                };

                return skillDetails;
            }

            return null;
        }

        public int DeleteResource(int? id)
        {
            int res = 0;
            var objEmployee = _pkonnectdatacontext.Resources.FirstOrDefault(b => b.ResourceId == id);
            if (objEmployee != null)
            {
                _pkonnectdatacontext.Resources.Remove(objEmployee);
                res = _pkonnectdatacontext.SaveChanges();
            }
            return res;
        }

        public Resources GetResource(int? id)
        {
            var employee = _pkonnectdatacontext.Resources.FirstOrDefault(b => b.ResourceId == id);
            return employee;
        }
    }
}