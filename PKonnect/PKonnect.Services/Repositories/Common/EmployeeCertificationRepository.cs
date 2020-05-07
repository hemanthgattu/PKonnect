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
    public class EmployeeCertificationRepository : IEmployeeCertificationRepository
    {
            private readonly PKonnectDataContext _pkonnectdatacontext;
        public EmployeeCertificationRepository(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }
        public EmployeeCertification GetCertification(int? id)
        {
            var certification = _pkonnectdatacontext.EmployeeCertification.FirstOrDefault(b => b.CertificationId == id);
            return certification;
        }

        public IQueryable<EmployeeCertification> GetCertifications()
        {
            if (_pkonnectdatacontext != null)
            {
                return _pkonnectdatacontext.EmployeeCertification.Where(certification => certification.IsActive).AsNoTracking();
            }

            return null;
        }
    }
}
