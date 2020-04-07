using Microsoft.AspNetCore.Mvc;
using PKonnect.Models.Common;
using PKonnect.Services;
using PKonnect.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PKonnect.Services.Infrastructure;
using Microsoft.AspNetCore.Authorization;

namespace PKonnect.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class EmployeeSkillsController : BaseApiController
    {
        private readonly IEmployeeSkillRepository _context;

        public EmployeeSkillsController(IEmployeeSkillRepository context)
        {
            _context = context;
        }

        // GET api/values
        [HttpGet]
        [ProducesResponseType(typeof(EmployeeSkill), 200)]
        public IEnumerable<EmployeeSkill> Get()
        {
            return _context.GetEmployeeSkills();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            try
            {
                var post = _context.GetEmployeeSkill(id);

                if (post == null)
                {
                    return NotFound();
                }

                return Ok(post);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

    }

}
