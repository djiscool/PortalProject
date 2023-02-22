using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PortalProjectAPI.Data;
using PortalProjectAPI.Dtos;
using PortalProjectAPI.Logic;
using PortalProjectAPI.Models;

namespace PortalProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IUserLogic _userLogic;

        public UsersController(ApplicationDbContext context, IUserLogic logic)
        {
            _context = context;
            _userLogic = logic;
        }

        [HttpGet]
        [Authorize]
        [Route("GetUsers")]
        // GET: Users
        public async Task<IActionResult> GetUsers(int page, int pageSize, string? filter)
        {
            var query = _context.Users.AsQueryable();

            if (filter != null)
                query = query.Where(a => a.FirstName.Contains(filter) || a.LastName.Contains(filter));

            var count = await query.CountAsync();

            var users = await query.Select(a => new UserDto 
            { 
                Email = a.Email, 
                Id = a.Id, 
                FirstName = a.FirstName,
                LastName = a.LastName
            }).ToListAsync();


            // could simplify this by using projectto and automapper
            var data = new PagedUsersDto { 
                Users = users, 
                CurrentPage = page, 
                PageSize = pageSize, 
                TotalCount = count, 
                TotalPages = (int)Math.Ceiling(count / (double)pageSize) 
            };

            return Ok(data);
        }

        // POST: Users/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [Authorize]
        [Route("Create")]
        public async Task<IActionResult> Create(UserDto user)
        {
            await _userLogic.CreateUserAsync(user);
            return Ok();

        }

        // POST: Users/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,FirstName,LastName,Email,Password")] User user)
        {
            if (id != user.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(user);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserExists(user.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(user);
        }

        // POST: Users/Delete/5
        [HttpPost, ActionName("Delete")]
        [Authorize]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            if (_context.Users == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Users'  is null.");
            }
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool UserExists(Guid id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
