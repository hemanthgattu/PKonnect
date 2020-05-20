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
        public DbSet<Resources> Resources { get; set; }
        public DbSet<Skill> Skill { get; set; }
        public DbSet<ResourceSkills> ResourceSkills { get; set; }
        public DbSet<ClientLocation> ClientLocation { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<IntacctLocation> IntacctLocation { get; set; }
        public DbSet<SearchAnalytics> SearchAnalytics { get; set; }
        public DbSet<EmployeeCertification> EmployeeCertification { get; set; }
        public DbSet<PageAnalytics> PageAnalytics { get; set; }

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
