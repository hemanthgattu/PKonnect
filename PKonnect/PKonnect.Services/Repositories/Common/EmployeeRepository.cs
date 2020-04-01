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

        public List<Employee> GetEmployees()
        {
            if (_pkonnectdatacontext != null)
            {
                return _pkonnectdatacontext.Employee.ToList();
            }

            return null;
        }

        public int DeleteEmployee(int? id)
        {
            int res = 0;
            var objEmployee = _pkonnectdatacontext.Employee.FirstOrDefault(b => b.Id == id);
            if (objEmployee != null)
            {
                _pkonnectdatacontext.Employee.Remove(objEmployee);
                res = _pkonnectdatacontext.SaveChanges();
            }
            return res;
        }

        public Employee GetEmployee(int? id)
        {
            var employee = _pkonnectdatacontext.Employee.FirstOrDefault(b => b.Id == id);
            return employee;
        }
    }
}
