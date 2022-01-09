using games.Legislation.Data;
using games.Legislation.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace games.Legislation.Controllers
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
        public void Post(Bill_Vote vote)
        {

            //Game g = _context.Game.FirstOrDefault(item => item.name == game_name);
            Player p = _context.Player.FirstOrDefault(item => item.PlayerID == HttpContext.Session.GetInt32("player").Value);
            Bill b = _context.Bill.FirstOrDefault(item => item.BillID == vote.BillID);

            //Bill_Vote bv = _context.Bill_Vote.FirstOrDefault(item => item.BillID == b.BillID && item.PlayerID == p.PlayerID);
            //TODO: Verify that player is part of game and owner of bill
            switch (vote.vote)
            {
                case 'Y':   //Aye
                case 'N':   //Nay
                case 'P':   //Present
                    CastVote(p, b, vote.vote);
                    break;
                case 'A':   //Amend -- must be owner
                    //Bill b = _context.Bill.First(item => item.BillID == bill_id);
                    b.proposed = false;
                    _context.SaveChanges();
                    break;
                case 'C':   //Close -- must be owner

                    IQueryable<Game_Law> _Law = _context.Game_Law.Where(item => item.GameID == b.GameID).OrderBy(item => item.IssueID);
                    IQueryable<Bill_Hand> _Hand = _context.Bill_Hand.Where(item => item.BillID == b.BillID).OrderBy(item => item.IssueID);
                    foreach (Bill_Hand B in _Hand)
                    {
                        int issue_id = B.IssueID;
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

        private void CastVote(Player p, Bill b, char vote)
        {

            Bill_Vote bv = _context.Bill_Vote.FirstOrDefault(item => item.BillID == b.BillID && item.PlayerID == p.PlayerID);

            if (bv == null)
            {
                bv = new Bill_Vote {
                    BillID = b.BillID,
                    PlayerID = p.PlayerID,
                    vote = vote
                };
                _context.Bill_Vote.Add(bv);
            } else {
                bv.vote = vote;
            }
            _context.SaveChanges();
            
        }

    }
}
