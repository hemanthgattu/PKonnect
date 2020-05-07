using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PKonnect.Models.Common
{
    public class IntacctLocation
    {
        [Key]
        public long IntacctLocationId { get; set; }
        public string IntacctLocationName { get; set; }
        public string Country { get; set; }
        public bool IsActive { get; set; }
    }
}
