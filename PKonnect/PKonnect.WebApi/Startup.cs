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


            services.AddAuthentication(sharedOptions =>
            {

                sharedOptions.DefaultScheme = AzureADDefaults.AuthenticationScheme;
            })
                .AddJwtBearer("AzureAD", options =>
                 {
                     options.Audience = Configuration.GetValue<string>("AzureAd:Audience");
                     options.Authority = Configuration.GetValue<string>("AzureAd:Instance")
                     + Configuration.GetValue<string>("AzureAd:TenantId");

                     options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
                     {
                         ValidIssuer = Configuration.GetValue<string>("AzureAd:Issuer"),
                         ValidAudience = Configuration.GetValue<string>("AzureAd:Audience")
                     };

                 });

            services.AddTransient<ICommunityFeedbackService, CommunityFeedbackService>();
            services.AddDbContext<PKonnectDataContext>
           (options => options.UseSqlServer(Configuration.GetConnectionString("DBConnectionString")));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
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
        }
    }
}
