using System;
using System.Collections.Generic;
using System.Text;

namespace PKonnect.Models.Common
{
    public class Address
    {
        public long AddressId { get; set; }
        public string ClientAddress { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string SourceSystemName { get; set; }
        public string SourceSystemId { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public Boolean IsActive { get; set; }
    }   
}
