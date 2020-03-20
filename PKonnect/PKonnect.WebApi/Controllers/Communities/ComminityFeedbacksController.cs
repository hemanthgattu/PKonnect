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
        private readonly ICommunityFeedbackRepository _context;

        public ComminityFeedbacksController(ICommunityFeedbackRepository context)
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
        public ActionResult<string> Get(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            try
            {
                var post =  _context.GetCommunityFeedback(id);

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

        [HttpPost]
        public  IActionResult Post([FromBody]CommunityFeedback objCommunityFeedback)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    objCommunityFeedback.CreatedDate = DateTime.Now;
                    objCommunityFeedback.ModifiedDate = DateTime.Now;
                    var id =  _context.AddCommunityFeedbacks(objCommunityFeedback);
                    if (id > 0)
                    {
                        return Ok(id);
                    }
                    else
                    {
                        return NotFound();
                    }
                }
                catch (Exception ex)
                {

                    return BadRequest();
                }

            }

            return BadRequest();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int? id)
        {
            int result = 0;

            if (id == null)
            {
                return BadRequest();
            }

            try
            {
                result =  _context.DeleteCommunityFeedback(id);
                if (result == 0)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }
    }

}
