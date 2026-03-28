using Helpdesk.API.DTOs;
using Helpdesk.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Helpdesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")] // Only IT Admins can assign assets
    public class AssetsController : ControllerBase
    {
        private readonly AssetService _assetService;

        public AssetsController(AssetService assetService)
        {
            _assetService = assetService;
        }

        [HttpPost("assign")]
        public async Task<IActionResult> AssignAsset(AssignAssetDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = await _assetService.AssignAssetToUserAsync(dto);
                return Ok(new { message = result });
            }
            catch (Exception ex)
            {
                // This will catch the custom THROW errors we wrote inside the SQL Stored Procedure!
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
