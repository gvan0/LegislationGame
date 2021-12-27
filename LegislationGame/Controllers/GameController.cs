using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using com.nordstrands.games.Legislation.Data;
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
            game.LAW = _context.Game_Law.Where(item => item.GameID == game.GameID).ToList();
            /*game.LAW = (ICollection<object>)
                       (from item in _context.Game_Law
                       select new { item.IssueID, item.score });*/

            return game;
        }

        [HttpGet("{id1}/{id2}")]
        public async Task<ActionResult<Game_Player>> GetGamePlayer(string id1, string id2)
        {
            Game g = _context.Game.SingleOrDefault(game => game.name == id1);
            Player p = _context.Player.SingleOrDefault(player => player.username == id2);
            HttpContext.Session.SetString("game", id1);
            HttpContext.Session.SetString("player", id2);

            if (g == null || p == null)
                return NotFound();
            //TODO: Verify that player is requesting their own
            Game_Player gp = await _context.Game_Player.SingleOrDefaultAsync(player => player.GameID == g.GameID && player.session_name == id2);

            if (gp == null) { //TODO: Authenticate player
                gp = new Game_Player {
                    GameID = g.GameID,
                    score_green = 0
                };
                _context.Game_Player.Add(gp);
                _context.SaveChanges();
            }

            gp.RedCards = _context.Player_Hand.Where(item => item.Game_PlayerID == gp.Game_PlayerID).OrderBy(item => item.IssueID).ToList();
            if(gp.RedCards.Count < g.hand_size) {
                Random rng = new Random();
                while(gp.RedCards.Count < g.hand_size) {
                    Player_Hand ph = new Player_Hand
                    {
                        Game_PlayerID = gp.Game_PlayerID,
                        //ph.GamePlayer = gp;
                        IssueID = rng.Next(g.deck_size) + 1,
                        score = rng.Next(2) * 2 - 1
                    };
                    if (!gp.RedCards.Any(item => item.IssueID == ph.IssueID)) {
                        gp.RedCards.Add(ph);
                        _context.Player_Hand.Add(ph);
                        _context.SaveChanges();
                    }
                }
            }

            return gp;

        }

        [HttpGet("{id1}/{id2}/money")]
        public async Task<ActionResult<int>> GetGP_GP(string id1, string id2)
        {

            Game g = _context.Game.SingleOrDefault(game => game.name == id1);
            Player p = _context.Player.SingleOrDefault(player => player.username == id2);

            if (g == null || p == null)
                return NotFound();
            //TODO: Verify that player is requesting their own
            Game_Player gp = await _context.Game_Player.SingleOrDefaultAsync(item => item.GameID == g.GameID && item.player_name == p.username);

            //TODO: Authenticate player
            if (gp == null)
                return NotFound();
            return gp.score_green;
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
            if (_context.Game.Any(item => item.name == game.name))
                return BadRequest();

            game.start_time = DateTime.UtcNow;
            //TODO: Encode password + salt
            _context.Game.Add(game);

            for(int x = 1; x <= game.deck_size; x++)
            {
                Game_Law l = new Game_Law {
                    GameID = game.GameID,
                    IssueID = x,
                    score = 0
                };
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
