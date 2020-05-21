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
    public class SearchAnalyticsRepository : ISearchAnalyticsRepository
    {
        private readonly PKonnectDataContext _pkonnectdatacontext;

        public SearchAnalyticsRepository(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }
        public SearchAnalytics GetSearchAnalytic(int? id)
        {
            var searchAnalytics = _pkonnectdatacontext.SearchAnalytics.FirstOrDefault(b => b.SearchAnalyticsId == id);
            return searchAnalytics;
        }

        public IQueryable<SearchAnalytics> GetSearchAnalytics()
        {
            if (_pkonnectdatacontext != null)
            {
                return _pkonnectdatacontext.SearchAnalytics.Where(searchAnalytics => searchAnalytics.IsActive).AsNoTracking();
            }

            return null;
        }

        public int AddSearchAnalytics(SearchAnalytics searchAnalytics)
        {
            _pkonnectdatacontext.SearchAnalytics.Add(searchAnalytics);
            int searchAnalyticsId = _pkonnectdatacontext.SaveChanges();
            return searchAnalyticsId;
        }
    }
}
