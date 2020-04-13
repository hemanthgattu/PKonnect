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
                return _pkonnectdatacontext.Employee.Where(Employee => Employee.IsActive).AsNoTracking();
            }

            return null;
        }

        public IQueryable<object> GetEmployeeDetails(string skillName, string employeeName, string role, string location)
        {
            if (_pkonnectdatacontext != null)
            {
                string[] SkillNames = new string[] { };

                if (!string.IsNullOrEmpty(skillName))
                    SkillNames = skillName.Split(',');

                //if (SkillNames.Count() <= 0) { SkillNames = null; }


                var employees = (from emp in _pkonnectdatacontext.Employee
                                 where (employeeName == null || (emp.FullName == employeeName)) && emp.IsActive
                                 && (location == null || (emp.City == location))
                                 select new
                                 {
                                     emp.EmployeeId,
                                     emp.FirstName,
                                     emp.LastName,
                                     emp.FullName,
                                     emp.Gender,
                                     emp.City,
                                     emp.State,
                                     emp.Country,
                                     emp.ZipCode
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
                               
                var employeeskills = (from emp in employees
                                      join empSkills in _pkonnectdatacontext.EmployeeSkill
                                      on emp.EmployeeId equals empSkills.EmployeeId
                                      select new
                                      {
                                          empSkills.EmployeeSkillId,
                                          empSkills.BestFitSkill,
                                          empSkills.LastYearUsed,
                                          empSkills.SkillRating
                                      }).ToList();








                var details = (from employee in _pkonnectdatacontext.Employee
                               where employeeName == null || (employee.FullName == employeeName)
                               select new EmployeeSkillDetails()
                               {
                                   EmployeeId = employee.EmployeeId,
                                   FirstName = employee.FirstName,
                                   LastName = employee.LastName,
                                   FullName = employee.FullName,
                                   Gender = employee.Gender,
                                   City = employee.City,
                                   State = employee.State,
                                   Country = employee.Country,
                                   EmployeeSkills = (from es in _pkonnectdatacontext.EmployeeSkill
                                                    // join s in _pkonnectdatacontext.Skill
                                                    // on es.SkillId equals s.SkillId into empSkill
                                                    // from emps in empSkill.DefaultIfEmpty()
                                                     where (es.EmployeeId == employee.EmployeeId)
                                                   // && (skillName == null || (SkillNames.Contains(emps.TextName))))
                                                     select new EmployeeSkillList()
                                                     {
                                                         EmployeeSkillId = es.EmployeeSkillId,
                                                         BestFitSkill = es.BestFitSkill,
                                                         //TextName = emps.TextName,
                                                         SkillRating = es.SkillRating,
                                                         LastYearUsed = es.LastYearUsed
                                                         //SkillGroup = emps.SkillGroup,
                                                         //SkillType = emps.SkillType,
                                                         //SkillId = emps.SkillId
                                                     }
                                                     ).ToList()

                               }).ToList();


                //var list = from s in _pkonnectdatacontext.Skill
                //           join d in details
                //           on s.SkillId equals d.EmployeeSkills.

                var employeeSkills = details.Where(a => a.EmployeeSkills.Any()).ToList().AsQueryable().Skip((1 - 1) * 1)
        .Take(1);


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
