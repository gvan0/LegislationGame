using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace com.nordstrands.games.Legislation.Models
{
    [Table("Game_Player")]
    public class Game_Player
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Game_PlayerID { get; set; }
        public int GameID { get; set; }
        public int PlayerID { get; set; }
        public bool active { get; set; }
        public int money { get; set; }

        public ICollection<Player_Hand> RedCards { get; set; }
    }
}
