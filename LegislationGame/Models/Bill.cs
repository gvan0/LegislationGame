using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace com.nordstrands.games.Legislation.Models
{
    [Table("Bill")]
    public class Bill
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BillID { get; set; }
        public int GameID { get; set; }
        [ForeignKey("GameID")]
        [JsonIgnore]
        public Game MyGame { get; set; }
        public int PlayerID { get; set; }
        [ForeignKey("PlayerID")]
        [JsonIgnore]
        public Player MyPlayer { get; set; }
        public bool active { get; set; }
        public bool proposed { get; set; }

        public ICollection<Bill_Hand> blueCards { get; set; }
    }
}
