using LibraryAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace YourApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole<Guid>> _roleManager;

    public AuthController(UserManager<User> userManager, RoleManager<IdentityRole<Guid>> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    [Authorize] // 🔒 Rejects the request immediately if the HttpOnly cookie is missing or invalid
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
    public record UserRoleRequest(string Email, string Role);
}
