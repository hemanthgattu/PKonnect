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

namespace PKonnect.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class ResourcesController : BaseApiController
    {
        private readonly IResourcesRepository _context;

        public ResourcesController(IResourcesRepository context)
        {
            _context = context;
        }

        // GET api/values
        [HttpGet]
        [EnableQuery()]
        public IQueryable<Resources> Get()
        {
            return _context.GetResources();
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
                var post = _context.GetResource(id);

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


        //GET api/values
        [HttpGet("GetResourceDetails")]
        [ODataRoute("GetResourceDetails")]
        public object GetResourceDetails([FromODataUri] long? resourceId, [FromODataUri] string skillName, [FromODataUri] string employeeName, [FromODataUri]string role, [FromODataUri] string resourceStatus, [FromODataUri]string location, [FromODataUri] string email, [FromODataUri] string certificationNames, [FromODataUri] int pageSize = 10, [FromODataUri] int pageNumber = 1)

        {
            // employeeName = "Eric Fabela Sanchez";
            // skillName = "Java";
            //role = "Developer - DotNet";
            return _context.GetResourceDetails(resourceId, skillName, employeeName, role, resourceStatus, location, email,certificationNames,pageSize, pageNumber);
        }

        #region commented code 


        //[HttpPost]
        //public IActionResult Post([FromBody]Employee objEmployee)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            objEmployee.CreatedDate = DateTime.Now;
        //            objEmployee.ModifiedDate = DateTime.Now;
        //            objEmployee.IsActive = true;
        //            var id = _context.AddEmployee(objEmployee);
        //            if (id > 0)
        //            {
        //                return Ok(id);
        //            }
        //            else
        //            {
        //                return NotFound();
        //            }
        //        }
        //        catch (Exception ex)
        //        {

        //            return BadRequest();
        //        }

        //    }

        //    return BadRequest();
        //}



        //// PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/values/5
        //[HttpDelete("{id}")]
        //public IActionResult Delete(int? id)
        //{
        //    int result = 0;

        //    if (id == null)
        //    {
        //        return BadRequest();
        //    }

        //    try
        //    {
        //        result = _context.DeleteEmployee(id);
        //        if (result == 0)
        //        {
        //            return NotFound();
        //        }
        //        return Ok();
        //    }
        //    catch (Exception)
        //    {

        //        return BadRequest();
        //    }
        //}

        #endregion
    }

}
