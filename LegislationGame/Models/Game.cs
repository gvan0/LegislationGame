using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.ComponentModel.DataAnnotations.Schema;

namespace LegislationGame.Models
{
    [Table("Game")]
    public class Game
    {
        public int ID { get; set; }
        public string name { get; set; }

        public DateTime start_time { get; set; }

        public int deck_size { get; set; }
        public int bill_size { get; set; }
        public int hand_size { get; set; }

        public IQueryable<Law> law { get; set; }


    }
}
