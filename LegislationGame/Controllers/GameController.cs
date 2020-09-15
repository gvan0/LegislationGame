using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using com.nordstrands.games.Legislation.Models;

namespace com.nordstrands.games.Legislation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly LegislationDataContext _context;

        public GameController(LegislationDataContext context)
        {
            _context = context;
        }

        // GET: api/Game
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Game>>> GetDbGames()
        //{
        //    return await _context.Game.ToListAsync();
        //}

        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGame(string id)
        {
            //TODO: Verify that player is part of game
            Game game = await _context.Game.SingleOrDefaultAsync(item => item.name == id);

            if (game == null)
                return NotFound();

            Bill last_bill = _context.Bill.SingleOrDefault(item => item.BillID == game.last_bill);
            last_bill.blueCards = _context.Bill_Hand.Where(item => item.BillID == last_bill.BillID).ToList();
            game.CurrentBill = last_bill;

            return game;
        }

        [HttpGet("{id1}/{id2}")]
        public async Task<ActionResult<Game_Player>> GetGamePlayer(string id1, string id2)
        {
            Game g = _context.Game.SingleOrDefault(item => item.name == id1);
            Player p = _context.Player.SingleOrDefault(item => item.username == id2);

            if (g == null || p == null)
                return NotFound();
            //TODO: Verify that player is requesting their own
            Game_Player gp = await _context.Game_Player.SingleOrDefaultAsync(item => item.GameID == g.GameID && item.PlayerID == p.PlayerID);

            if (gp == null) { //TODO: Authenticate player
                gp = new Game_Player();
                gp.GameID = g.GameID;
                gp.PlayerID = p.PlayerID;
                gp.active = true;
                gp.money = 4;
                _context.Game_Player.Add(gp);
                _context.SaveChanges();
            }

            gp.redCards = _context.Player_Hand.Where(item => item.Game_PlayerID == gp.Game_PlayerID).OrderBy(item => item.IssueID).ToList();
            if(gp.redCards.Count() < g.hand_size) {
                Random rng = new Random();
                while(gp.redCards.Count() < g.hand_size) {
                    Player_Hand ph = new Player_Hand();
                    ph.Game_PlayerID = gp.Game_PlayerID;
                    //ph.GamePlayer = gp;
                    ph.IssueID = rng.Next(g.deck_size)+1;
                    ph.score = rng.Next(2) * 2 - 1;
                    if(!gp.redCards.Any(item => item.IssueID == ph.IssueID)) {
                        gp.redCards.Add(ph);
                        _context.Player_Hand.Add(ph);
                        _context.SaveChanges();
                    }
                }
            }

            return gp;

        }

        // PUT: api/Game/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGame(string id, Game game)
        {
            if (id != game.name)
            {
                return BadRequest();
            }

            _context.Entry(game).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Game
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Game>> PostGame(Game game)
        {
            game.start_time = DateTime.UtcNow;
            _context.Game.Add(game);
            //TODO: Generate random laws
            for(int x = 1; x <= game.deck_size; x++)
            {
                Game_Law l = new Game_Law();
                l.GameID = game.GameID;
                l.IssueID = x;
                l.score = 0;
                _context.Game_Law.Add(l);
            }
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGame", new { id = game.GameID }, game);
        }

        // DELETE: api/Game/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Game>> DeleteGame(int id)
        {
            var game = await _context.Game.FindAsync(id);
            if (game == null)
            {
                return NotFound();
            }

            _context.Game.Remove(game);
            await _context.SaveChangesAsync();

            return game;
        }

        private bool GameExists(string id)
        {
            return _context.Game.Any(e => e.name == id);
        }
    }
}
