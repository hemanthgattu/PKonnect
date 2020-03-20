using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PKonnect.Models.Communities
{
    [Table("CommunityFeedback")]
    public class CommunityFeedback
    {
        [Key]
        public long CommunityFeedbackId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Feedback { get; set; }
        public bool SkillSerach { get; set; }
        public bool NetWorking { get; set; }
        public bool Training { get; set; }
        public bool Mentorship { get; set; }
        public DateTimeOffset ModifiedDate { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public bool IsActive { get; set; }
    }
}
