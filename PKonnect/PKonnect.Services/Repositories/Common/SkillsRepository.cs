using Microsoft.EntityFrameworkCore;
using PKonnect.Context;
using PKonnect.Models.Common;
using PKonnect.Services.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PKonnect.Services.DataServices
{
    public class SkillsRepository : ISkillsRepository

    {
        private readonly PKonnectDataContext _pkonnectdatacontext;

        public SkillsRepository(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }

        public IQueryable<Skill> GetSkills()
        {
            if (_pkonnectdatacontext != null)
            {
                return _pkonnectdatacontext.Skill.Where(skill => skill.IsActive).OrderBy(s => s.TextName).AsNoTracking();
            }

            return null;
        }


        public Skill GetSkill(int? id)
        {
            var employee = _pkonnectdatacontext.Skill.FirstOrDefault(b => b.SkillId == id);
            return employee;
        }
    }
}
