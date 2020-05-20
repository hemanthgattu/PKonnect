using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PKonnect.Models.Common;
using PKonnect.Repositories.IRepositories.Common;

namespace PKonnect.WebApi.Controllers.Common
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeRolesController : BaseApiController
    {
        private readonly IEmployeeRoleRepository _context;

        public EmployeeRolesController(IEmployeeRoleRepository context)
        {
            _context = context;
        }

        // GET api/values
        [HttpGet]
        [EnableQuery()]
        [ProducesResponseType(typeof(EmployeeRole), 200)]
        public IQueryable<EmployeeRole> Get()
        {
            return _context.GetRoles();
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
                var post = _context.GetRole(id);

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