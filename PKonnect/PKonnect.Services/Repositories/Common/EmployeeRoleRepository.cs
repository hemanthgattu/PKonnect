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
    public class EmployeeRoleRepository : IEmployeeRoleRepository
    {
        private readonly PKonnectDataContext _pkonnectdatacontext;

        public EmployeeRoleRepository(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }

        public IQueryable<EmployeeRole> GetRoles()
        {
            if (_pkonnectdatacontext != null)
            {
                return _pkonnectdatacontext.EmployeeRole.Where(role => role.IsActive).AsNoTracking();
            }

            return null;
        }

        public EmployeeRole GetRole(int? id)
        {
            var role = _pkonnectdatacontext.EmployeeRole.FirstOrDefault(b => b.EmployeeRoleId == id);
            return role;
        }
    }
}
