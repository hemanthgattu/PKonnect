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
using Microsoft.AspNet.OData;

namespace PKonnect.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class CertificationsController : BaseApiController
    {
        private readonly ICertificationsRepository _context;

        public CertificationsController(ICertificationsRepository context)
        {
            _context = context;
        }

        // GET api/values
        [HttpGet]
        [EnableQuery()]
        [ProducesResponseType(typeof(Skill), 200)]
        public IQueryable<Certifications> Get()
        {
            return _context.GetCertifications();
        }
       
    }

}
