using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace com.nordstrands.games.Legislation.Models
{
    [Table("Bill_Hand")]
    public class Bill_Hand
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Bill_HandID { get; set; }
        public int BillID { get; set; }
        [ForeignKey(name: "BillID")]
        [JsonIgnore]
        public Bill MyBill { get; set; }
        public int IssueID { get; set; }
        public int score { get; set; }
    }
}
