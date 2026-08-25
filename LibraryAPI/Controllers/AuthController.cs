using LibraryAPI.Data;
using LibraryAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace YourApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole<Guid>> _roleManager;
    private readonly ApplicationDbContext _context;
    public AuthController(UserManager<User> userManager, RoleManager<IdentityRole<Guid>> roleManager, ApplicationDbContext context)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _context = context;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync([FromBody] RegisterRequest request)
    {
        var duplicateFields = new List<string>();

        if (await _userManager.FindByNameAsync(request.UserName) is not null)
        {
            duplicateFields.Add("username");
        }

        if (await _userManager.FindByEmailAsync(request.Email) is not null)
        {
            duplicateFields.Add("email");
        }

        if (duplicateFields.Count > 0)
        {
            return BadRequest(new
            {
                Message = $"The following values are already in use: {string.Join(" and ", duplicateFields)}."
            });
        }

        if (!await _roleManager.RoleExistsAsync(request.Role))
        {
            return BadRequest(new { Message = $"The role '{request.Role}' does not exist." });
        }

        var user = new User
        {
            UserName = request.UserName,
            Email = request.Email
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            return BadRequest(new { Errors = result.Errors });
        }

        var roleResult = await _userManager.AddToRoleAsync(user, request.Role);
        if (!roleResult.Succeeded)
        {
            await _userManager.DeleteAsync(user);
            return BadRequest(new { Errors = roleResult.Errors });
        }

        return Ok(new { Message = "Registration successful." });
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUserAsync()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        var roles = await _userManager.GetRolesAsync(user);
        var username = await _userManager.GetUserNameAsync(user);

        return Ok(new
        {
            Id = user.Id,
            Email = user.Email,
            Roles = roles,
            UserName = username
        });
    }
    [AllowAnonymous]
    [HttpGet("role")]
    public async Task<IActionResult> GetAllRoles()
    {
        var roles = await _context.Roles
            .Select(r => new
            {
                Id = r.Id,
                Name = r.Name
            })
            .ToListAsync();

        return Ok(roles);
    }

    [Authorize]
    [HttpPost("assign-role")]
    public async Task<IActionResult> AssignRoleAsync([FromBody] UserRoleRequest request)
    {
        // 1. Verify that the requested user actually exists in SQL Server
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
        {
            return NotFound(new { Message = $"User with email {request.Email} not found." });
        }

        // 2. Validate that the target role exists in the AspNetRoles table
        var roleExists = await _roleManager.RoleExistsAsync(request.Role);
        if (!roleExists)
        {
            return BadRequest(new { Message = $"The role '{request.Role}' does not exist in the system." });
        }

        // 3. Check if the user is already assigned to this role
        var isInRole = await _userManager.IsInRoleAsync(user, request.Role);
        if (isInRole)
        {
            return BadRequest(new { Message = $"User is already assigned to the '{request.Role}' role." });
        }

        // 4. Persist the association to the AspNetUserRoles junction table
        var result = await _userManager.AddToRoleAsync(user, request.Role);
        if (!result.Succeeded)
        {
            return BadRequest(new { Errors = result.Errors });
        }

        return Ok(new { Message = $"Successfully assigned {request.Email} to the '{request.Role}' role." });
    }
    public record RegisterRequest(string UserName, string Email, string Password, string Role);
    public record UserRoleRequest(string Email, string Role);
}
