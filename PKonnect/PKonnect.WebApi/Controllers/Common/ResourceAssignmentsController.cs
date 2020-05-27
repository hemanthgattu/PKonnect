using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PKonnect.Models.Common;
using PKonnect.Repositories.IRepositories.Common;

namespace PKonnect.WebApi.Controllers.Common
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourceAssignmentsController : ControllerBase
    {
        private readonly IResourceAssignmentsRepository _context;

        public ResourceAssignmentsController(IResourceAssignmentsRepository context)
        {
            _context = context;
        }

        // GET: api/ResourceAssignments
        [HttpGet]
        public IQueryable<ResourceAssignments> Get()
        {
            return _context.GetResourceAssignments();
        }

        // GET: api/ResourceAssignments/5
        [HttpGet("{id}")]
        public IActionResult Get(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            try
            {
                var post = _context.GetResourceAssignment(id);

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

        // POST: api/ResourceAssignments
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/ResourceAssignments/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
