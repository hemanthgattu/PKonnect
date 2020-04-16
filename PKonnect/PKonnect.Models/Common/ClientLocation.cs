using System;
using System.Collections.Generic;
using System.Text;

namespace PKonnect.Models.Common
{
    public class ClientLocation
    {
        public long ClientLocationId { get; set; }
        public string ClientAddress { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string SourceSystemName { get; set; }
        public string SourceSystemId { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public DateTimeOffset ModifiedDate { get; set; }
        public Boolean IsActive { get; set; }
    }   
}
