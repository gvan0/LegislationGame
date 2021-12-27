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

        public string password { get; set; }

        public string password_salt { get; set; }
        public string email { get; set; }


    }
}
