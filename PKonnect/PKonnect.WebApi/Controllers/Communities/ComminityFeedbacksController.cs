using Microsoft.AspNetCore.Mvc;
using PKonnect.Models.Communities;
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
    public class ComminityFeedbacksController : BaseApiController
    {
        private readonly ICommunityFeedbackService _context;

        public ComminityFeedbacksController(ICommunityFeedbackService context)
        {
            _context = context;
        }

        // GET api/values
        [HttpGet]
        [ProducesResponseType(typeof(CommunityFeedback), 200)]
        public ActionResult<IEnumerable<CommunityFeedback>> Get()
        {
            return _context.GetCommunityFeedbacks();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        //// POST api/values
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }

}
