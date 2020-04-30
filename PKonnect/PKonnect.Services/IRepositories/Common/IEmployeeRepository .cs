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
        object GetEmployeeDetails(string skillName, string employeeName, string role, string resourceStatus, string location, int pageSize, int pageNumber);
        int DeleteEmployee(int? id);
        Employee GetEmployee(int? id);
        int AddEmployee(Employee employee);
    }
}
