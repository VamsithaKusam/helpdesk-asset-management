-- ==========================================
-- 2. Data Archival Stored Procedure
-- WHY: Moves tickets that have been "Resolved" for > 30 days to the ArchivedTickets table.
-- ==========================================
CREATE OR ALTER PROCEDURE ArchiveOldResolvedTickets
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Step A: Copy old resolved tickets into the Archive table
        INSERT INTO ArchivedTickets (Id, Title, Description, Status, CreatedAt, UserId)
        SELECT Id, Title, Description, Status, CreatedAt, UserId
        FROM Tickets
        WHERE Status = 'Resolved' AND DATEDIFF(DAY, CreatedAt, GETDATE()) > 30;

        -- Step B: Delete them from the main table so it stays fast
        DELETE FROM Tickets
        WHERE Status = 'Resolved' AND DATEDIFF(DAY, CreatedAt, GETDATE()) > 30;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO
