﻿using Microsoft.EntityFrameworkCore;
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
    public class EmployeeSkillRepository : IEmployeeSkillRepository

    {
        private readonly PKonnectDataContext _pkonnectdatacontext;

        public EmployeeSkillRepository(PKonnectDataContext PKonnectDataContext)
        {
            _pkonnectdatacontext = PKonnectDataContext;
        }


        public IQueryable<EmployeeSkill> GetEmployeeSkills()
        {
            if (_pkonnectdatacontext != null)
            {
                return _pkonnectdatacontext.EmployeeSkill.Where(EmployeeSkill => EmployeeSkill.IsActive)//.Include(EmployeeSkill => EmployeeSkill.Skills)
                    .AsNoTracking();
            }

            return null;
        }

    
        public EmployeeSkill GetEmployeeSkill(int? id)
        {
            var employeeSkill = _pkonnectdatacontext.EmployeeSkill.FirstOrDefault(b => b.EmployeeSkillId == id);
            return employeeSkill;
        }
    }
}
