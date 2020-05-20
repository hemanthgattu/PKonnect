using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using PKonnect.Context;
using PKonnect.Services.DataServices;
using PKonnect.Services.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.OData.Edm;
using Microsoft.AspNet.OData.Builder;
using PKonnect.Models.Common;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using PKonnect.Repositories.IRepositories.Common;
using PKonnect.Repositories.Repositories.Common;

namespace PKonnect.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });


            //services.AddAuthentication(sharedOptions =>
            //{

            //    sharedOptions.DefaultScheme = AzureADDefaults.AuthenticationScheme;
            //})
            //    .AddJwtBearer("AzureAD", options =>
            //     {
            //         options.Audience = Configuration.GetValue<string>("AzureAd:Audience");
            //         options.Authority = Configuration.GetValue<string>("AzureAd:Instance")
            //         + Configuration.GetValue<string>("AzureAd:TenantId");

            //         options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
            //         {
            //             ValidIssuer = Configuration.GetValue<string>("AzureAd:Issuer"),
            //             ValidAudience = Configuration.GetValue<string>("AzureAd:Audience")
            //         };

            //     });

            services.AddScoped<ICommunityFeedbackRepository, CommunityFeedbackRepository>();
            services.AddScoped<IResourcesRepository, ResourcesRepository>();
            services.AddScoped<IResourceSkillsRepository, ResourceSkillsRepository>();
            services.AddScoped<ISkillsRepository, SkillsRepository>();
            services.AddScoped<IClientLocationRepository, ClientLocationRepository>();
            services.AddScoped<IRolesRepository, RolesRepository>();
            services.AddScoped<IIntacctLocationRepository, IntacctLocationRepository>();
            services.AddScoped<IEmployeeCertificationRepository, EmployeeCertificationRepository>();
            services.AddScoped<ISearchAnalyticsRepository, SearchAnalyticsRepository>();
            services.AddScoped<IPageAnalyticsRepository, PageAnalyticsRepository>();

            services.AddControllers();

            services.AddDbContext<PKonnectDataContext>
           (options => options.UseSqlServer(Configuration.GetConnectionString("DBConnectionString")));

            services.Configure<CustomVariables>(Configuration.GetSection("CustomVariables"));

            services.AddCors();
            services.AddOData();

            services.AddMvc(option => option.EnableEndpointRouting = false).SetCompatibilityVersion(CompatibilityVersion.Version_3_0);




        }

        //https://localhost:44314
        //https://pkonnectresearchui.azurewebsites.net
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(options =>
            options.WithOrigins("*")
            .AllowAnyHeader()
            .AllowAnyMethod());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });



            app.UseMvc(routeBuilder =>
            {

                routeBuilder.EnableDependencyInjection();
                routeBuilder.Expand().Select().Count().OrderBy().Filter();
                routeBuilder.MapODataServiceRoute("odata", "odata", GetEdmModel());
            });

        }


        public static IEdmModel GetEdmModel()
        {
            var builder = new ODataConventionModelBuilder();
            builder.EntitySet<Resources>("Resources");
            builder.EntitySet<ResourceSkills>("ResourceSkills");
            builder.EntitySet<Skill>("Skills");
            builder.EntitySet<Roles>("Roles");
            builder.EntitySet<ClientLocation>("ClientLocations");
            builder.EntitySet<ClientLocation>("ClientLocations");
            builder.EntitySet<IntacctLocation>("IntacctLocations");
            builder.EntitySet<EmployeeCertification>("EmployeeCertifications");
            builder.EntitySet<SearchAnalytics>("SearchAnalytics");
            builder.EntitySet<PageAnalytics>("PageAnalytics");

            
            builder.EntitySet<Resources>(nameof(Resources));
            {
                var function = builder.Function("GetResourceDetails");
                function.Parameter<string>("skillName");
                function.Parameter<string>("employeeName");
                //function.Parameter<string>("availability");
                //function.Parameter<string>("role");
                //function.Parameter<string>("location");
                function.Returns<string>();

            }

            return builder.GetEdmModel();
        }
    }
}
