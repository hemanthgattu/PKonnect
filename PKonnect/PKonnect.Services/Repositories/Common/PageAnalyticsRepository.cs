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
    public class PageAnalyticsRepository : IPageAnalyticsRepository
    {
        private readonly PKonnectDataContext _pkonnectdatacontext;

        public PageAnalyticsRepository(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }

        public int AddPageAnalytics(PageAnalytics pageAnalytics)
        {
            _pkonnectdatacontext.PageAnalytics.Add(pageAnalytics);
            int pageAnalyticsId = _pkonnectdatacontext.SaveChanges();
            return pageAnalyticsId;
        }

        public PageAnalytics GetPageAnalytic(int? id)
        {
            var pageAnalytics = _pkonnectdatacontext.PageAnalytics.FirstOrDefault(b => b.PageAnalyticsId == id);
            return pageAnalytics;
        }

        public IQueryable<PageAnalytics> GetPageAnalytics()
        {
            if (_pkonnectdatacontext != null)
            {
                return _pkonnectdatacontext.PageAnalytics.Where(pageAnalytics => pageAnalytics.IsActive).AsNoTracking();
            }

            return null;
        }
    }
}
