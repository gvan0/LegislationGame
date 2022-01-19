using Microsoft.EntityFrameworkCore;
using games.Legislation.Models;

namespace games.Legislation.Data
{
    public class LegislationDataContext : DbContext
    {
        public LegislationDataContext(DbContextOptions<LegislationDataContext> options) : base(options)
        {

        }

        public DbSet<Bill> Bill { get; set; }
        public DbSet<Bill_Hand> Bill_Hand { get; set; }
        public DbSet<Bill_Vote> Bill_Vote { get; set; }
        public DbSet<Game> Game { get; set; }
        public DbSet<Game_Law> Game_Law { get; set; }
        public DbSet<Game_Message> Game_Message { get; set; }
        public DbSet<Game_Player> Game_Player { get; set; }
        public DbSet<Player> Player { get; set; }
        public DbSet<Player_Hand> Player_Hand { get; set; }
    }
}
