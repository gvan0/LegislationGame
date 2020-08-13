using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LegislationGame.Models
{
    [Table("Law")]
    public class Law
    {
        public int ID { get; set; }
        public int game_id { get; set; }
        public int issue_id { get; set; }
        public int score { get; set; } = 0;
    }
}
