using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using LegislationGame.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LegislationGame.Controllers
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

        // GET: api/<VoteController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<VoteController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<VoteController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
            dynamic ans = JsonSerializer.Deserialize<object>(value);
            int game_id = ans.game_id;
            if(ans.Vote == "Y")
            {
                IQueryable<Law> _Law = _context.Law.Where(item => item.game_id == game_id);
                foreach (dynamic B in ans.Bill)
                {
                    int issue_id = B.issue_id;
                    Law l = _Law.Single(item => item.issue_id == issue_id);
                    l.score += B.score;
                }
                _context.SaveChanges();
            }
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
