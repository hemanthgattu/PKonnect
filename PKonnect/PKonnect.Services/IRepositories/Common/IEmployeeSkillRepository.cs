﻿using PKonnect.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PKonnect.Services.Infrastructure
{
    public interface IEmployeeSkillRepository
    {
        IQueryable<EmployeeSkill> GetEmployeeSkills();


        EmployeeSkill GetEmployeeSkill(int? id);
        
    }
}
