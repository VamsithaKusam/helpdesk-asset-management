-- ==========================================
-- 1. Pagination & Dynamic Sorting Stored Procedure
-- WHY: So the Admin dashboard only loads 10 tickets at a time instead of crashing the browser with 10,000.
-- ==========================================
CREATE OR ALTER PROCEDURE GetAdminTicketsPaged
    @PageNumber INT = 1,
    @PageSize INT = 10,
    @SortColumn NVARCHAR(50) = 'CreatedAt',
    @SortDirection NVARCHAR(4) = 'DESC'
AS
BEGIN
    SET NOCOUNT ON;

    SELECT t.Id, t.Title, t.Status, t.CreatedAt, u.Name AS UserName
    FROM Tickets t
    INNER JOIN Users u ON t.UserId = u.Id
    ORDER BY 
        CASE WHEN @SortDirection = 'ASC' AND @SortColumn = 'CreatedAt' THEN t.CreatedAt END ASC,
        CASE WHEN @SortDirection = 'DESC' AND @SortColumn = 'CreatedAt' THEN t.CreatedAt END DESC,
        CASE WHEN @SortDirection = 'ASC' AND @SortColumn = 'Status' THEN t.Status END ASC,
        CASE WHEN @SortDirection = 'DESC' AND @SortColumn = 'Status' THEN t.Status END DESC
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END;
GO
