using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PKonnect.Models.Common
{
    public partial class ResourceSkills
    {
        [Key]
        public long ResourceSkillId { get; set; }
        public long? ResourceId { get; set; }
        public long? SkillId { get; set; }
        public bool BestFitSkill { get; set; }
        public long? SkillRating { get; set; }

        public string Contact { get; set; }
        public long? LastYearUsed { get; set; }
        public bool? Submitted { get; set; }
        public DateTimeOffset ModifiedDate { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public bool IsActive { get; set; }
        //public virtual ICollection<Skill> Skills { get; set; }
    }
}
