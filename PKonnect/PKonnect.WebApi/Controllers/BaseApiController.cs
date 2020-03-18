using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PKonnect.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        protected string GetUserInfo(string type)
        {
            return this.User.Claims.First(i => i.Type == type).Value;
        }
    }
}
