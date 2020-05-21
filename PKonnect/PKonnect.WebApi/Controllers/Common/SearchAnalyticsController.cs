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
using Microsoft.AspNet.OData.Routing;
using PKonnect.Repositories.IRepositories.Common;

namespace PKonnect.WebApi.Controllers.Common
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchAnalyticsController : BaseApiController
    {
        private readonly ISearchAnalyticsRepository _context;

        public SearchAnalyticsController(ISearchAnalyticsRepository context)
        {
            _context = context;
        }

        // GET: api/SearchAnalytics
        [HttpGet]
        public IQueryable<SearchAnalytics> Get()
        {
            return _context.GetSearchAnalytics();
        }

        // GET: api/SearchAnalytics/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            try
            {
                var post = _context.GetSearchAnalytic(id);

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

        // POST: api/SearchAnalytics
        [HttpPost]
        public IActionResult Post([FromBody]SearchAnalytics objSearchAnalytics)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    objSearchAnalytics.CreatedDate = DateTime.Now;
                    objSearchAnalytics.ModifiedDate = DateTime.Now;
                    objSearchAnalytics.IsActive = true;
                    var id = _context.AddSearchAnalytics(objSearchAnalytics);
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

        // PUT: api/SearchAnalytics/5
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
