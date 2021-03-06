﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace com.nordstrands.games.Legislation.Models
{
    [Table("Game_Law")]
    public class Game_Law
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Game_LawID { get; set; }
        public int GameID { get; set; }
        public int IssueID { get; set; }
        public int score { get; set; } = 0;
    }
}
