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
    public class IntacctLocationRepository : IIntacctLocationRepository
    {
        private readonly PKonnectDataContext _pkonnectdatacontext;
        public IntacctLocationRepository(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }

        public IntacctLocation GetIntacctLocation(int? id)
        {
            var ilocation = _pkonnectdatacontext.IntacctLocation.FirstOrDefault(b => b.IntacctLocationId == id);
            return ilocation;
        }

        public IQueryable<IntacctLocation> GetIntacctLocations()
        {
            if (_pkonnectdatacontext != null)
            {
                return _pkonnectdatacontext.IntacctLocation.Where(ilocation => ilocation.IsActive).AsNoTracking();
            }

            return null;
        }
    }
}
