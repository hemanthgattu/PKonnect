using PKonnect.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PKonnect.Services.Infrastructure
{
    public interface IEmployeeRepository
    {
        IQueryable<Employee> GetEmployees();
        IQueryable<object> GetEmployeeDetails(string skillName, string employeeName, string role, string location);
        int DeleteEmployee(int? id);
        Employee GetEmployee(int? id);
        int AddEmployee(Employee employee);
    }
}
