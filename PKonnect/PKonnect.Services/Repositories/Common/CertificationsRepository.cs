using Microsoft.EntityFrameworkCore;
using PKonnect.Context;
using PKonnect.Models.Common;
using PKonnect.Services.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PKonnect.Services.DataServices
{
    public class CertificationsRepository : ICertificationsRepository

    {
        private readonly PKonnectDataContext _pkonnectdatacontext;

        public CertificationsRepository(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }

        public IQueryable<Certifications> GetCertifications()
        {
            if (_pkonnectdatacontext != null)
            {
                return _pkonnectdatacontext.Certifications.Where(cer => cer.IsActive).AsNoTracking();
            }

            return null;
        }
    }
}
