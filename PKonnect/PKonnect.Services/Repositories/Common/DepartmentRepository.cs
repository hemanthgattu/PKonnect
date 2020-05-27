using Microsoft.EntityFrameworkCore;
using PKonnect.Context;
using PKonnect.Models.Common;
using PKonnect.Repositories.IRepositories.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PKonnect.Repositories.Repositories.Common
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly PKonnectDataContext _pkonnectdatacontext;

        public DepartmentRepository(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }
        public Department GetDepartment(int? id)
        {
            var department = _pkonnectdatacontext.Department.FirstOrDefault(d => d.DepartmentId == id);
            return department;
        }

        public IQueryable<Department> GetDepartments()
        {
            if (_pkonnectdatacontext != null)
            {
                return _pkonnectdatacontext.Department.Where(department => department.IsActive).AsNoTracking();
            }

            return null;
        }
    }
}
