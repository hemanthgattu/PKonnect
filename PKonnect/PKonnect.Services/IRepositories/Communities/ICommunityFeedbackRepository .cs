using PKonnect.Models.Communities;
using System;
using System.Collections.Generic;
using System.Text;

namespace PKonnect.Services.Infrastructure
{
    public interface ICommunityFeedbackRepository
    {
        List<CommunityFeedback> GetCommunityFeedbacks();
        int DeleteCommunityFeedback(int? id);
        CommunityFeedback GetCommunityFeedback(int? id);
        int AddCommunityFeedbacks(CommunityFeedback communityfeedback);
    }
}
