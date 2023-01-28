using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace DataAccess
{
    public class Context : IdentityDbContext<IdentityUser>
    {
        public Context(DbContextOptions<Context> options) : base(options) { }
        public DbSet<Order> Orders { get; set; }
    }
}
