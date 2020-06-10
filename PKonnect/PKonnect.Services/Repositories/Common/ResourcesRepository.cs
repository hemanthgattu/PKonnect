using Microsoft.EntityFrameworkCore;
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
                    return _pkonnectdatacontext.Resources.Where(Resource => Resource.IsActive).OrderBy(R => R.FullName).AsNoTracking();
                }
                catch (Exception ex)
                {

                }
            }

            return null;
        }

        public object GetResourceDetails(long? resourceId, string skillNames, string employeeName, string role, string resourceStatus, string location, string email, string certificationNames, int pageSize, int pageNumber)
        {
            if (_pkonnectdatacontext != null)
            {
                //SearchAnalytics analytics = new SearchAnalytics
                //{
                //    EmployeeEmailId = email,
                //    Role = role,
                //    SkillNames = skillNames,
                //    ResourceStatus = resourceStatus,
                //    Location = location,
                //    IsActive = true,
                //    CreatedDate = DateTime.Now,
                //    PageNumber = pageNumber
                //};

                //_pkonnectdatacontext.SearchAnalytics.Add(analytics);
                //// executes the appropriate commands to implement the changes to the database  
                //_pkonnectdatacontext.SaveChanges();


                string[] SkillNames = new string[] { };
                string[] locations = new string[] { };
                string[] Certifications = new string[] { };

                if (!string.IsNullOrEmpty(skillNames))
                    SkillNames = skillNames.Split(',');

                if (!string.IsNullOrEmpty(location))
                    locations = location.Split(',');

                if (!string.IsNullOrEmpty(certificationNames))
                    Certifications = certificationNames.Split(',');

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
                                on employee.RoleId equals employeeRole.RoleId into ER
                               from employeeRole in ER.DefaultIfEmpty()
                               join intacct in _pkonnectdatacontext.IntacctLocation
                               on employee.IntacctLocationId equals intacct.IntacctLocationId
                               where
                               (employee.DepartmentName == "IT Svcs Gen - Projects" || employee.DepartmentName == "Research and Development" || employee.DepartmentName == "Missing") &&
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
                                   DepartmentId = employee.DepartmentId,
                                   DepartmentName = employee.DepartmentName,
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
                                   ResourceCertifications = (from cv in _pkonnectdatacontext.CertificationVendors
                                                             join c in _pkonnectdatacontext.Certifications
                                                             on cv.CertificationVendorId equals c.CertificationVendorId
                                                             join rc in _pkonnectdatacontext.ResourceCertifications
                                                             on c.CertificationId equals rc.CertificationId
                                                             where (rc.ResourceId == employee.ResourceId) && rc.IsActive
                                                             && (certificationNames == null || (certificationNames.Contains(c.CertificationName)))
                                                             orderby rc.AchivedDate descending
                                                             select new ResourceCertificationsList()
                                                             {
                                                                 ResourceCertificationId = rc.ResourceCertificationId,
                                                                 CertificationId = rc.CertificationId,
                                                                 LicenseNumber = rc.LicenseNumber,
                                                                 AchivedDate = rc.AchivedDate,
                                                                 ExpirationDate = rc.ExpirationDate,
                                                                 VendorName = cv.VendorName,
                                                                 CertificationName = c.CertificationName,
                                                                 CertificationNumber = c.CertificationNumber
                                                             }
                                                             ).ToList()
                               }).ToList();

                var details1 = details.Where(d => d.ResourceSkills.Any(y => (skillNames == null || (SkillNames.Contains(y.TextName))))).ToList();

                var details2 = details.Where(d => d.ResourceSkills.Count == 0).ToList();

                details = details1.Union(details2).ToList();

                //var details3 = details.Where(d => d.ResourceCertifications.Any(y => (certificationNames == null || (certificationNames.Contains(y.CertificationNumber))))).ToList();

                //var details4 = details.Where(d => d.ResourceCertifications.Count == 0).ToList();

                details = details1.Union(details2).ToList();

                //.Where(a => a.ResourceSkills.Any())ToList().

                var resourceSkills = details.AsQueryable().Skip((pageNumber - 1) * pageSize).Take(pageSize);
                var recordCount = resourceSkills.Count() < 10 & details.Count() <= resourceSkills.Count() ? resourceSkills.Count() : details.Count();

                var skillDetails = new SkillDetails
                {
                    ResourceSkillDetails = resourceSkills,
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