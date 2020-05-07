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
    public class EmployeeCertificationsController : ControllerBase
    {
        private readonly IEmployeeCertificationRepository _context;

        public EmployeeCertificationsController(IEmployeeCertificationRepository context)
        {
            _context = context;
        }

        // GET api/values
        [HttpGet]
        [EnableQuery()]
        [ProducesResponseType(typeof(EmployeeCertification), 200)]
        public IQueryable<EmployeeCertification> Get()
        {
            return _context.GetCertifications();
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
                var post = _context.GetCertification(id);

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