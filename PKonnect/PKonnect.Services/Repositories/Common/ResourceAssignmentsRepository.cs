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
    public class ResourceAssignmentsRepository : IResourceAssignmentsRepository
    {
        private readonly PKonnectDataContext _pkonnectdatacontext;
        public ResourceAssignmentsRepository(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }
        public ResourceAssignments GetResourceAssignment(int? id)
        {
            var resourceAssignment = _pkonnectdatacontext.ResourceAssignments.FirstOrDefault(ra => ra.ResourceAssignmentId == id);
            return resourceAssignment;
        }

        public IQueryable<ResourceAssignments> GetResourceAssignments()
        {
            if (_pkonnectdatacontext != null)
            {
                return _pkonnectdatacontext.ResourceAssignments.Where(resourceAssignment => resourceAssignment.IsActive).AsNoTracking();
            }

            return null;
        }
    }
}
