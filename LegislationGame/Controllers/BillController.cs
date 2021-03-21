using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using com.nordstrands.games.Legislation.Data;
using com.nordstrands.games.Legislation.Models;
using System.Text.Json;

namespace com.nordstrands.games.Legislation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillController : ControllerBase
    {
        private readonly LegislationDataContext _context;

        public BillController(LegislationDataContext context)
        {
            _context = context;
        }

        // GET: api/Bill/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Bill>> GetBill(int id)
        {
            var bill = await _context.Bill.FindAsync(id);

            if (bill == null)
            {
                return NotFound();
            }
            bill.blueCards = _context.Bill_Hand.Where(item => item.BillID == id).ToList();

            return bill;
        }

        [HttpGet("{id1}/{id2}")]
        public async Task<ActionResult<Bill>> GetBill(string id1, string id2)
        {
            Game g = _context.Game.SingleOrDefault(item => item.name == id1);
            Player p = _context.Player.SingleOrDefault(item => item.username == id2);

            Bill bill = await _context.Bill.SingleOrDefaultAsync(item => item.BillID == g.last_bill);

            if (bill == null)
            {
                return NotFound();
            }
            bill.blueCards = _context.Bill_Hand.Where(item => item.BillID == bill.BillID).ToList();

            return bill;
        }

        // PUT: api/Bill/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBill(int id, Bill bill)
        {
            if (id != bill.BillID)
            {
                return BadRequest();
            }

            _context.Bill_Hand.RemoveRange(_context.Bill_Hand.Where(item => item.BillID == id));
            _context.Bill_Hand.AddRange(bill.blueCards);
            _context.Entry(bill).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BillExists(id))
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

        // POST: api/Bill
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Bill>> PostBill(Bill bill)
        {
            //bill.MyGame = _context.Game.Single(item => item.name == id);
            _context.Bill.Add(bill);
            foreach (Bill_Hand blueCard in bill.blueCards)
            {
                blueCard.BillID = bill.BillID;
                _context.Add(blueCard);
            }
            //g.last_bill = bill.BillID;
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBill", new { id = bill.BillID }, bill);
        }

        private bool BillExists(int id)
        {
            return _context.Bill.Any(e => e.BillID == id);
        }
    }
}
