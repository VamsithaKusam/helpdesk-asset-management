using Helpdesk.API.Data;
using Helpdesk.API.DTOs;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Helpdesk.API.Services
{
    public class AssetService
    {
        private readonly AppDbContext _context;

        public AssetService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<string> AssignAssetToUserAsync(AssignAssetDTO dto)
        {
            // 1. We map the DTO values to secure SQL Parameters to prevent hacking (SQL Injection)
            var assetTagParam = new SqlParameter("@AssetTag", dto.AssetTag);
            var userIdParam = new SqlParameter("@UserId", dto.UserId);

            // 2. We tell Entity Framework to execute the Stored Procedure we wrote in SSMS
            await _context.Database.ExecuteSqlRawAsync(
                "EXEC AssignAssetToUser @AssetTag, @UserId",
                assetTagParam, userIdParam);

            return "Asset successfully assigned!";
        }
    }
}