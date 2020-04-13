using System;
using System.Collections.Generic;
using System.Text;

namespace PKonnect.Models.Common
{
    public class Role
    {
        public long RoleId { get; set; }
        public string RoleName { get; set; }
        public string RoleGroup { get; set; }
        public string SourceSystemName { get; set; }
        public string SourceSystemId { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public DateTimeOffset ModifiedDate { get; set; }
        public Boolean IsActive { get; set; }
    }
}
