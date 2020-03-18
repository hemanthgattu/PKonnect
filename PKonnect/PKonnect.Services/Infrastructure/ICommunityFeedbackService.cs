using PKonnect.Models.Communities;
using System;
using System.Collections.Generic;
using System.Text;

namespace PKonnect.Services.Infrastructure
{
    public interface ICommunityFeedbackService
    {
        List<CommunityFeedback> GetCommunityFeedbacks();
    }
}
