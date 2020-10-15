﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using com.nordstrands.games.Legislation.Models;
using Microsoft.AspNetCore.Razor.Language;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace com.nordstrands.games.Legislation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoteController : ControllerBase
    {
        private readonly LegislationDataContext _context;
        public VoteController(LegislationDataContext context)
        {
            _context = context;
        }

        // POST api/<VoteController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
            dynamic bv = JsonSerializer.Deserialize<object>(value);
            string game_name = bv.game_id;
            string player_name = bv.username;

            Game g = _context.Game.FirstOrDefault(item => item.name == game_name);
            Player p = _context.Player.FirstOrDefault(item => item.username == player_name);
            Bill b = _context.Bill.FirstOrDefault(item => item.BillID == g.last_bill);

            //Bill_Vote bv = _context.Bill_Vote.FirstOrDefault(item => item.BillID == b.BillID && item.PlayerID == p.PlayerID);
            //TODO: Verify that player is part of game and owner of bill
            switch (bv.vote[0])
            {
                case 'Y':   //Aye
                case 'N':   //Nay
                case 'P':   //Present
                    castVote(p, b, bv.vote);
                    break;
                case 'A':   //Amend -- must be owner
                    //Bill b = _context.Bill.First(item => item.BillID == bill_id);
                    b.proposed = false;
                    _context.SaveChanges();
                    break;
                case 'C':   //Close -- must be owner
                    int game_id = bv.game_id;

                    IQueryable<Game_Law> _Law = _context.Game_Law.Where(item => item.GameID == game_id).OrderBy(item => item.IssueID);
                    IQueryable<Bill_Hand> _Hand = _context.Bill_Hand.Where(item => item.BillID == b.BillID).OrderBy(item => item.IssueID);
                    foreach (dynamic B in bv.Bill)
                    {
                        int issue_id = B.issue_id;
                        Game_Law l = _Law.Single(item => item.IssueID == issue_id);
                        l.score += B.score;
                    }
                    _context.SaveChanges();
                    break;
                default:
                    Response.StatusCode = 400;
                    break;
            }
        }

        private void castVote(Player p, Bill b, char vote)
        {

            Bill_Vote bv = _context.Bill_Vote.FirstOrDefault(item => item.BillID == b.BillID && item.PlayerID == p.PlayerID);

            if (bv == null)
            {
                bv = new Bill_Vote();
                bv.BillID = b.BillID;
                bv.PlayerID = p.PlayerID;
                bv.vote = vote;
                _context.Bill_Vote.Add(bv);
            } else {
                bv.vote = vote;
            }
            _context.SaveChanges();
            
        }

        // PUT api/<VoteController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<VoteController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
