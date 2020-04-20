using System;
using System.Collections.Generic;
using System.Text;

namespace PKonnect.Models.Common
{
    public class IntacctLocation
    {
        public long IntacctLocationId { get; set; }
        public string IntacctLocationName { get; set; }
        public string Country { get; set; }
        public bool IsActive { get; set; }
    }
}
