using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace com.nordstrands.games.Legislation.Models
{
    [Table("Game")]
    public class Game
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int GameID { get; set; }
        public string name { get; set; }

        public DateTime start_time { get; set; }

        public int deck_size { get; set; }
        public int bill_size { get; set; }
        public int hand_size { get; set; }
        public string password { get; set; }
        public string password_salt { get; set; }
        public int last_bill { get; set; }
        public Bill CurrentBill { get; set; }
        public ICollection<Game_Law> LAW { get; set; }


    }
}
