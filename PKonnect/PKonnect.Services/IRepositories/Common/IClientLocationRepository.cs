using PKonnect.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PKonnect.Repositories.IRepositories.Common
{
    public interface IClientLocationRepository
    {
        IQueryable<ClientLocation> GetLocations();
        ClientLocation GetLocation(int? id);
    }
}
