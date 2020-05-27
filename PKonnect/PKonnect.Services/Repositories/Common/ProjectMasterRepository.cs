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
    public class ProjectMasterRepository : IProjectMasterRepository
    {
        private readonly PKonnectDataContext _pkonnectdatacontext;
        public ProjectMasterRepository(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }
        public ProjectMaster GetProjectMaster(int? id)
        {
            var projectMaster = _pkonnectdatacontext.ProjectMaster.FirstOrDefault(d => d.ProjectMasterId == id);
            return projectMaster;
        }

        public IQueryable<ProjectMaster> GetProjectMasters()
        {
            if (_pkonnectdatacontext != null)
            {
                return _pkonnectdatacontext.ProjectMaster.AsNoTracking();
            }

            return null;
        }
    }
}
