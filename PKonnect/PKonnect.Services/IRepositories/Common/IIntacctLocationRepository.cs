using PKonnect.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PKonnect.Repositories.IRepositories.Common
{
    public interface IIntacctLocationRepository
    {
        IQueryable<IntacctLocation> GetIntacctLocations();

        IntacctLocation GetIntacctLocation(int? id);
    }
}
