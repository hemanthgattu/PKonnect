using PKonnect.Models.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace PKonnect.Services.Infrastructure
{
    public interface IEmployeeSkillRepository
    {
        List<EmployeeSkill> GetEmployeeSkills();
       
        EmployeeSkill GetEmployeeSkill(int? id);
        
    }
}
