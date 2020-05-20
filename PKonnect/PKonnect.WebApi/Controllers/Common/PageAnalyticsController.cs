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
    public class PageAnalyticsController : BaseApiController
    {
        private readonly IPageAnalyticsRepository _context;

        public PageAnalyticsController(IPageAnalyticsRepository context)
        {
            _context = context;
        }
        // GET: api/PageAnalytics
        [HttpGet]
        public IQueryable<PageAnalytics> Get()
        {
            return _context.GetPageAnalytics();
        }

        // GET: api/PageAnalytics/5
        [HttpGet("{id}")]
        public IActionResult Get(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            try
            {
                var post = _context.GetPageAnalytic(id);

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

        // POST: api/PageAnalytics
        [HttpPost]
        public IActionResult Post([FromBody]PageAnalytics objPageAnalytics)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    objPageAnalytics.CreatedDate = DateTime.Now;
                    objPageAnalytics.ModifiedDate = DateTime.Now;
                    objPageAnalytics.IsActive = true;
                    var id = _context.AddPageAnalytics(objPageAnalytics);
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

        // PUT: api/PageAnalytics/5
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
