using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PKonnect.Models.Common
{
    public class Skill
    {
        [Key]
        public long SkillId { get; set; }
        public string SkillGroup { get; set; }
        public string SkillType { get; set; }
        public string PracticeArea { get; set; }
        public string Term { get; set; }
        public string TextName { get; set; }
        public DateTimeOffset ModifiedDate { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public bool IsActive { get; set; }



    }
}
