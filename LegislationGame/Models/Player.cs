using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace com.nordstrands.games.Legislation.Models
{
    [Table("Player")]
    public class Player
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PlayerID { get; set; }
        public string username { get; set; }

        public string cookie_session { get; set; }


    }
}
