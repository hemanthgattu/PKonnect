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

        public IQueryable<object> GetEmployeeDetails(string skillName, string employeeName, string role, string resourceStatus, string location, int pageSize, int pageNumber)
        {
            if (_pkonnectdatacontext != null)
            {
                string[] SkillNames = new string[] { };
                string[] locations = new string[] { };

                if (!string.IsNullOrEmpty(skillName))
                    SkillNames = skillName.Split(',');

                if (!string.IsNullOrEmpty(location))
                    locations = location.Split(',');

                //var employees = (from emp in _pkonnectdatacontext.Employee
                //                 where (employeeName == null || (emp.FullName == employeeName)) && emp.IsActive
                //                 && (location == null || (emp.City == location))
                //                 select new
                //                 {
                //                     emp.EmployeeId,
                //                     emp.FirstName,
                //                     emp.LastName,
                //                     emp.FullName,
                //                     emp.Gender,
                //                     emp.City,
                //                     emp.State,
                //                     emp.Country,
                //                     emp.ZipCode
                //                 }).ToList();

                var roles = (from r in _pkonnectdatacontext.EmployeeRole
                             where (role == null || (r.RoleName == role)) && r.IsActive
                             select new
                             {
                                 r.EmployeeRoleId,
                                 r.RoleGroup,
                                 r.RoleName
                             }).ToList();


                var skills = (from s in _pkonnectdatacontext.Skill
                              where (skillName == null || (SkillNames.Contains(s.TextName))) && s.IsActive
                              select new
                              {
                                  s.SkillGroup,
                                  s.SkillType,
                                  s.SkillId,
                                  s.TextName,
                              }).ToList();

                //var employeeskills = (from emp in employees
                //                      join empSkills in _pkonnectdatacontext.EmployeeSkill
                //                      on emp.EmployeeId equals empSkills.EmployeeId
                //                      select new
                //                      {
                //                          empSkills.EmployeeSkillId,
                //                          empSkills.BestFitSkill,
                //                          empSkills.LastYearUsed,
                //                          empSkills.SkillRating
                //                      }).ToList();






                var details = (from employee in _pkonnectdatacontext.Employee

                               join employeeRole in _pkonnectdatacontext.EmployeeRole
                              on (employee.EmployeeRoleId ?? 0) equals employeeRole.EmployeeRoleId

                               where (employeeName == null || (employee.FullName == employeeName)) && employee.IsActive
                               && (role == null || (employeeRole.RoleName == role)) && employeeRole.IsActive
                               && (resourceStatus == null || (employee.ResourceStatus == resourceStatus))
                               // && location == null || (locations.Contains(employee.SiteState))
                               //&& location == null || (locations.Contains(employee.SiteCity))

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
                                                     ).ToList()

                               }).ToList();


                //details = from d in details
                //          join EmployeeRole


                details = details.Where(d => d.EmployeeSkills.Any(y => (skillName == null || (SkillNames.Contains(y.TextName))))).ToList();




                var employeeSkills = details.Where(a => a.EmployeeSkills.Any()).ToList().AsQueryable().Skip((pageNumber - 1) * pageSize).Take(pageSize);

                return employeeSkills;
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
