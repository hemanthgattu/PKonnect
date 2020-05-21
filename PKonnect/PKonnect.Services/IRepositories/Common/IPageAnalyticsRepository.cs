using PKonnect.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PKonnect.Repositories.IRepositories.Common
{
    public interface IPageAnalyticsRepository
    {
        IQueryable<PageAnalytics> GetPageAnalytics();
        PageAnalytics GetPageAnalytic(int? id);
        int AddPageAnalytics(PageAnalytics pageAnalytics);
    }
}
