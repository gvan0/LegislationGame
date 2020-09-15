using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using com.nordstrands.games.Legislation.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace com.nordstrands.games.Legislation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LawController : ControllerBase
    {
        private readonly LegislationDataContext _context;
        public LawController(LegislationDataContext context)
        {
            _context = context;
        }

        // GET api/<LawController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Game_Law>>> GetLaws(string id)
        {
            Game game = _context.Game.SingleOrDefault(item => item.name == id);
            if (game == null)
                return NotFound();
            //TODO: Check that requesting player is part of game

            return await _context.Game_Law.Where(item => item.GameID == game.GameID).ToListAsync();

        }

        // POST api/<LawController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<LawController>/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody] string value)
        {
            //TODO: Check that player owns the bill
        }

    }
}
