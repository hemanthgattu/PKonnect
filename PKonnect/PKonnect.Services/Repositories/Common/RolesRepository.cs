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
    public class RolesRepository : IRolesRepository
    {
        private readonly PKonnectDataContext _pkonnectdatacontext;

        public RolesRepository(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }

        public IQueryable<Roles> GetRoles()
        {
            if (_pkonnectdatacontext != null)
            {
                return _pkonnectdatacontext.Roles.Where(role => role.IsActive).OrderBy(r => r.RoleName).AsNoTracking();
            }

            return null;
        }

        public Roles GetRole(int? id)
        {
            var role = _pkonnectdatacontext.Roles.FirstOrDefault(b => b.RoleId == id);
            return role;
        }
    }
}
