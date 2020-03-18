using PKonnect.Context;
using PKonnect.Models.Communities;
using PKonnect.Services.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PKonnect.Services.DataServices
{
    public class CommunityFeedbackService : ICommunityFeedbackService

    {
        private readonly PKonnectDataContext _pkonnectdatacontext;

        public CommunityFeedbackService(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }

        public List<CommunityFeedback> GetCommunityFeedbacks()
        {
            return _pkonnectdatacontext.CommunityFeedback.ToList();
        }
    }
}
