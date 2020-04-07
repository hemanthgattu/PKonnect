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
        int DeleteEmployee(int? id);
        Employee GetEmployee(int? id);
        int AddEmployee(Employee employee);
    }
}
