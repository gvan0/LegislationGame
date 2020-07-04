using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace LegislationGame.Models
{
    public class Game
    {
        public int Id { get; set; }
        public string name { get; set; }

        public DateTime start_time { get; set; }

        public int deck_size { get; set; }
        public int bill_size { get; set; }
        public int hand_size { get; set; }


    }
}
