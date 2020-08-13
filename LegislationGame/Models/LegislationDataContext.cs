using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace LegislationGame.Models
{
    public class LegislationDataContext : DbContext
    {
        public LegislationDataContext(DbContextOptions<LegislationDataContext> options) : base(options)
        {

        }

        public DbSet<Game> Game { get; set; }
        public DbSet<Law> Law { get; set; }
    }
}
