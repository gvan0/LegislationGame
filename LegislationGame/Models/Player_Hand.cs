using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace com.nordstrands.games.Legislation.Models
{
    [Table("Player_Hand")]
    public class Player_Hand
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Player_HandID { get; set; }

        public int Game_PlayerID { get; set; }
        [ForeignKey(name: "Game_PlayerID")]
        [JsonIgnore]
        public Game_Player GamePlayer { get; set; }
        public int IssueID { get; set; }
        public int score { get; set; }


    }
}
