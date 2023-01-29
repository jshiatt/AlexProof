using DataAccess;
using DataAccess.Repositories;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlexProof
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
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"])),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true
                };
            });

            services.AddDbContext<Context>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("orderDb"),
                b => b.MigrationsAssembly(typeof(Context).Assembly.FullName)));
            services.AddSingleton<UserContext>();
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SchemaFilter<XEnumNamesSchemaFilter>();
                c.ParameterFilter<XEnumNamesParameterFilter>();
                c.AddSecurityDefinition("bearer", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Scheme = "bearer"
                });
                c.OperationFilter<AuthenticationRequirementsOperationFilter>();
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "AlexProof", Version = "v1" });
            });
            services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddTransient<IOrdersRepository, OrdersRepository>();
            services.AddTransient<IUsersRepository, UsersRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AlexProof v1"));
            }

            app.UseCors(c =>
            {
                c.AllowAnyHeader();
                c.AllowAnyMethod();
                c.AllowAnyOrigin();
                c.SetPreflightMaxAge(TimeSpan.FromMinutes(10));
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

    public class AuthenticationRequirementsOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            if (operation.Security == null)
                operation.Security = new List<OpenApiSecurityRequirement>();


            var scheme = new OpenApiSecurityScheme { Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "bearer" } };
            operation.Security.Add(new OpenApiSecurityRequirement
            {
                [scheme] = new List<string>()
            });
        }
    }

    public class XEnumNamesSchemaFilter : ISchemaFilter
    {
        public void Apply(OpenApiSchema schema, SchemaFilterContext context)
        {
            var typeInfo = context.Type;
            if (typeInfo.IsEnum)
            {
                AddNames(typeInfo, schema);
            }
            else if (schema.Enum != null)
            {
                var names = schema.Enum.Select(n => new OpenApiString(n.ToString()));
                AddNames(names, schema);
            }
            else if (typeInfo.IsGenericType && !schema.Extensions.ContainsKey("x-enum-varnames"))
            {
                foreach (var genericArgumentType in typeInfo.GetGenericArguments())
                {
                    if (genericArgumentType.IsEnum)
                    {
                        AddNames(genericArgumentType, schema);
                    }
                }
            }
        }

        private void AddNames(Type type, OpenApiSchema schema)
        {
            var names = Enum.GetNames(type).Select(name => new OpenApiString(name));
            AddNames(names, schema);

        }

        private void AddNames(IEnumerable<OpenApiString> names, OpenApiSchema schema)
        {
            var arr = new OpenApiArray();

            arr.AddRange(names);
            schema.Extensions.Add("x-enum-varnames", arr);
        }
    }

    public class XEnumNamesParameterFilter : IParameterFilter
    {
        public void Apply(OpenApiParameter parameter, ParameterFilterContext context)
        {
            var typeInfo = context.ParameterInfo.ParameterType;
            if (typeInfo.IsEnum)
            {
                AddNames(context.ParameterInfo.ParameterType, parameter);
            }
            else if (typeInfo.IsGenericType && !parameter.Extensions.ContainsKey("x-enum-varnames2"))
            {
                foreach (var genericArgumentType in typeInfo.GetGenericArguments())
                {
                    if (genericArgumentType.IsEnum)
                    {
                        AddNames(genericArgumentType, parameter);
                    }
                }
            }
        }

        private void AddNames(Type type, OpenApiParameter parameter)
        {
            var names = Enum.GetNames(type).Select(name => new OpenApiString(name));

            var arr = new OpenApiArray();

            arr.AddRange(names);
            parameter.Extensions.Add("x-enum-varnames2", arr);
        }
    }
}
