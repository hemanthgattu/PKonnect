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
    public class RoleRepository : IRoleRepository
    {
        private readonly PKonnectDataContext _pkonnectdatacontext;

        public RoleRepository(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }

        public IQueryable<Role> GetRoles()
        {
            if (_pkonnectdatacontext != null)
            {
                return _pkonnectdatacontext.Role.Where(role => role.IsActive).AsNoTracking();
            }

            return null;
        }

        public Role GetRole(int? id)
        {
            var role = _pkonnectdatacontext.Role.FirstOrDefault(b => b.RoleId == id);
            return role;
        }
    }
}
