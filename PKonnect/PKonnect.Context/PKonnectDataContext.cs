using Microsoft.EntityFrameworkCore;
using PKonnect.Models.Common;
using PKonnect.Models.Communities;
using System;
using System.Collections.Generic;
using System.Text;

namespace PKonnect.Context
{
    public class PKonnectDataContext : DbContext
    {
        public PKonnectDataContext(DbContextOptions<PKonnectDataContext> options) : base(options)
        {

        }

        public DbSet<CommunityFeedback> CommunityFeedback { get; set; }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<Skill> Skill { get; set; }
        public DbSet<EmployeeSkill> EmployeeSkill { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public override int SaveChanges()
        {
            return base.SaveChanges();
        }
    }
}
