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
    public class ClientLocationRepository : IClientLocationRepository
    {
        private readonly PKonnectDataContext _pkonnectdatacontext;

        public ClientLocationRepository(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }

        public IQueryable<ClientLocation> GetLocations()
        {
            if (_pkonnectdatacontext != null)
            {
                return _pkonnectdatacontext.ClientLocation.Where(location => location.IsActive).AsNoTracking();
            }

            return null;
        }

        public ClientLocation GetLocation(int? id)
        {
            var location = _pkonnectdatacontext.ClientLocation.FirstOrDefault(b => b.ClientLocationId == id);
            return location;
        }
    }
}
