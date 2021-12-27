using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace com.nordstrands.games.Legislation.Models
{
    [Table("Game_Player")]
    public class Game_Player
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Game_PlayerID { get; set; }
        public int GameID { get; set; }
        public string player_name { get; set; }
        public string session_name { get; set; }
        public int score_blue { get; set; }
        public int score_green { get; set; }
        public int score_red { get; set; }

        public ICollection<Player_Hand> RedCards { get; set; }
    }
}
