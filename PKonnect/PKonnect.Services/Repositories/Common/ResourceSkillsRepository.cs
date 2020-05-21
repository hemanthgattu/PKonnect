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
    public class ResourceSkillsRepository : IResourceSkillsRepository

    {
        private readonly PKonnectDataContext _pkonnectdatacontext;

        public ResourceSkillsRepository(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }


        public IQueryable<ResourceSkills> GetResourceSkills()
        {
            if (_pkonnectdatacontext != null)
            {
                return _pkonnectdatacontext.ResourceSkills.Where(ResourceSkill => ResourceSkill.IsActive)//.Include(EmployeeSkill => EmployeeSkill.Skills)
                    .AsNoTracking();
            }

            return null;
        }

    
        public ResourceSkills GetResourceSkill(int? id)
        {
            var employeeSkill = _pkonnectdatacontext.ResourceSkills.FirstOrDefault(b => b.ResourceSkillId == id);
            return employeeSkill;
        }
    }
}
