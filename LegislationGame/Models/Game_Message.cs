using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace games.Legislation.Models
{
    public class Game_Message
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Game_MessageId { get; set; }
        public int GameID { get; set; }
        [ForeignKey("GameID")]
        [JsonIgnore]
        public Game MyGame { get; set; }
        public int Game_PlayerID { get; set; }
        [ForeignKey("Game_PlayerID")]
        [JsonIgnore]
        public Player MyPlayer { get; set; }
        public DateTime timestamp { get; set; }
        public string message { get; set; }
    }
}
