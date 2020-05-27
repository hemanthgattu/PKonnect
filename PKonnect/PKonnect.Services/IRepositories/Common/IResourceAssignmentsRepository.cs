using PKonnect.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PKonnect.Repositories.IRepositories.Common
{
    public interface IResourceAssignmentsRepository
    {
        IQueryable<ResourceAssignments> GetResourceAssignments();
        ResourceAssignments GetResourceAssignment(int? id);
    }
}
