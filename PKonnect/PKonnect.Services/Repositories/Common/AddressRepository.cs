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
    public class AddressRepository : IAddressRepository
    {
        private readonly PKonnectDataContext _pkonnectdatacontext;

        public AddressRepository(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }

        public IQueryable<Address> GetAddresses()
        {
            if (_pkonnectdatacontext != null)
            {
                return _pkonnectdatacontext.Address.Where(address => address.IsActive).AsNoTracking();
            }

            return null;
        }

        public Address GetAddress(int? id)
        {
            var address = _pkonnectdatacontext.Address.FirstOrDefault(b => b.AddressId == id);
            return address;
        }
    }
}
