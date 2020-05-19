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
    public class EmployeeRepository : IEmployeeRepository

    {
        private readonly PKonnectDataContext _pkonnectdatacontext;

        public EmployeeRepository(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }

        public int AddEmployee(Employee employee)
        {
            _pkonnectdatacontext.Employee.Add(employee);
            int employeeId = _pkonnectdatacontext.SaveChanges();
            return employeeId;
        }


        public IQueryable<Employee> GetEmployees()
        {
            if (_pkonnectdatacontext != null)
            {
                try
                {
                    return _pkonnectdatacontext.Employee.Where(Employee => Employee.IsActive).AsNoTracking();
                }
                catch (Exception ex)
                {

                }
            }

            return null;
        }

        public object GetEmployeeDetails(long? employeeId,string skillNames, string employeeName, string role, string resourceStatus, string location, string email, int pageSize, int pageNumber)
        {
            if (_pkonnectdatacontext != null)
            {
                Analytics analytics = new Analytics
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

                _pkonnectdatacontext.Analytics.Add(analytics);
                // executes the appropriate commands to implement the changes to the database  
                _pkonnectdatacontext.SaveChanges();


                string[] SkillNames = new string[] { };
                string[] locations = new string[] { };

                if (!string.IsNullOrEmpty(skillNames))
                    SkillNames = skillNames.Split(',');

                if (!string.IsNullOrEmpty(location))
                    locations = location.Split(',');

                var roles = (from r in _pkonnectdatacontext.EmployeeRole
                             where (role == null || (r.RoleName == role)) && r.IsActive
                             select new
                             {
                                 r.EmployeeRoleId,
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

                var details = (from employee in _pkonnectdatacontext.Employee
                               join employeeRole in _pkonnectdatacontext.EmployeeRole
                                on employee.EmployeeRoleId  equals employeeRole.EmployeeRoleId into ER
                               from employeeRole in ER.DefaultIfEmpty()
                               join intacct in _pkonnectdatacontext.IntacctLocation
                               on employee.IntacctLocationId equals intacct.IntacctLocationId                               
                               where
                               (employeeName == null || (employee.FullName == employeeName)) && employee.IsActive
                               && (employeeId == null || (employee.EmployeeId == employeeId))
                                && (resourceStatus == null || (employee.ResourceStatus == resourceStatus))
                              && (role == null || (employeeRole.RoleName == role))
                              &&
                              (location == null || (intacct.Country == location))
                              && employee.IsActive
                            
                               select new EmployeeSkillDetails()
                               {
                                   EmployeeId = employee.EmployeeId,
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
                                   EmployeeSkills = (from es in _pkonnectdatacontext.EmployeeSkill
                                                     join s in _pkonnectdatacontext.Skill
                                                    on es.SkillId equals s.SkillId into empSkill
                                                     from emps in empSkill.DefaultIfEmpty()
                                                     where (es.EmployeeId == employee.EmployeeId) && es.IsActive
                                                        && es.BestFitSkill
                                                     orderby es.SkillRating descending
                                                     //&& (skillName == null || (SkillNames.Contains(emps.TextName))))
                                                     select new EmployeeSkillList()
                                                     {
                                                         EmployeeSkillId = es.EmployeeSkillId,
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
                                                             where ec.EmployeeId == employee.EmployeeId
                                                             select ec).ToList()
                               }).ToList();

                var details1 = details.Where(d => d.EmployeeSkills.Any(y => (skillNames == null || (SkillNames.Contains(y.TextName))))).ToList();

                var details2 = details.Where(d => d.EmployeeSkills.Count == 0).ToList();

                details = details1.Union(details2).ToList();

                var employeeSkills = details.Where(a => a.EmployeeSkills.Any()).ToList().AsQueryable().Skip((pageNumber - 1) * pageSize).Take(pageSize);
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

        public int DeleteEmployee(int? id)
        {
            int res = 0;
            var objEmployee = _pkonnectdatacontext.Employee.FirstOrDefault(b => b.EmployeeId == id);
            if (objEmployee != null)
            {
                _pkonnectdatacontext.Employee.Remove(objEmployee);
                res = _pkonnectdatacontext.SaveChanges();
            }
            return res;
        }

        public Employee GetEmployee(int? id)
        {
            var employee = _pkonnectdatacontext.Employee.FirstOrDefault(b => b.EmployeeId == id);
            return employee;
        }
    }
}