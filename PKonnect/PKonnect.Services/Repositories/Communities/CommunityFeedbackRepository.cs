using PKonnect.Context;
using PKonnect.Models.Communities;
using PKonnect.Services.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PKonnect.Services.DataServices
{
    public class CommunityFeedbackRepository : ICommunityFeedbackRepository

    {
        private readonly PKonnectDataContext _pkonnectdatacontext;

        public CommunityFeedbackRepository(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }

        public int AddCommunityFeedbacks(CommunityFeedback communityfeedback)
        {
            _pkonnectdatacontext.CommunityFeedback.Add(communityfeedback);
            int communityFeedbackId = _pkonnectdatacontext.SaveChanges();
            return communityFeedbackId;
        }

        public List<CommunityFeedback> GetCommunityFeedbacks()
        {
            if (_pkonnectdatacontext != null)
            {
                return _pkonnectdatacontext.CommunityFeedback.ToList();
            }

            return null;
        }

        public int DeleteCommunityFeedback(int? id)
        {
            int res = 0;
            var objCommunityFeedback = _pkonnectdatacontext.CommunityFeedback.FirstOrDefault(b => b.CommunityFeedbackId == id);
            if (objCommunityFeedback != null)
            {
                _pkonnectdatacontext.CommunityFeedback.Remove(objCommunityFeedback);
                res = _pkonnectdatacontext.SaveChanges();
            }
            return res;
        }

        public CommunityFeedback GetCommunityFeedback(int? id)
        {
            var book = _pkonnectdatacontext.CommunityFeedback.FirstOrDefault(b => b.CommunityFeedbackId == id);
            return book;
        }
    }
}
