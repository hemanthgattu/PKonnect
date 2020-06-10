using PKonnect.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PKonnect.Services.Infrastructure
{
    public interface IResourcesRepository
    {
        IQueryable<Resources> GetResources();
        object GetResourceDetails(long? employeeId,string skillName, string employeeName, string role, string resourceStatus, string location, string email, string certificationNames, int pageSize, int pageNumber);
        int DeleteResource(int? id);
        Resources GetResource(int? id);
        int AddResource(Resources employee);
    }
}
