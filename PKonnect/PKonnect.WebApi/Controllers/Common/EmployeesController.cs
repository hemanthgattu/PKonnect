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
    public class EmployeesController : BaseApiController
    {
        private readonly IEmployeeRepository _context;

        public EmployeesController(IEmployeeRepository context)
        {
            _context = context;
        }

        // GET api/values
        [HttpGet]
        [EnableQuery()]
        public IQueryable<Employee> Get()
        {
            return _context.GetEmployees();
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
                var post = _context.GetEmployee(id);

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
        [HttpGet("GetEmployeeDetails")]
        [ODataRoute("GetEmployeeDetails")]
        public IQueryable<object> GetEmployeeDetails([FromODataUri] string skillName, [FromODataUri] string employeeName, [FromODataUri]string role, [FromODataUri] string resourceStatus, [FromODataUri]string location, [FromODataUri] int pageSize, [FromODataUri] int pageNumber)

        {
            // employeeName = "Eric Fabela Sanchez";
            // skillName = "Java";
            //role = "Developer - DotNet";
            return _context.GetEmployeeDetails(skillName, employeeName, role, resourceStatus, location, pageSize, pageNumber);
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
