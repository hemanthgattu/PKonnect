using PKonnect.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PKonnect.Repositories.IRepositories.Common
{
    public interface ISearchAnalyticsRepository
    {
        IQueryable<SearchAnalytics> GetSearchAnalytics();
        SearchAnalytics GetSearchAnalytic(int? id);
        int AddSearchAnalytics(SearchAnalytics searchAnalytics);       
    }
}
