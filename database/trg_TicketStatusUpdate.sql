
-- Create the Trigger: trg_TicketStatusUpdate
-- WHY: It listens for updates on the Tickets table and automatically logs the change in AuditLogs.

CREATE OR ALTER TRIGGER trg_TicketStatusUpdate
ON Tickets
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the 'Status' column was the one that was actually updated
    IF UPDATE(Status)
    BEGIN
        INSERT INTO AuditLogs (TicketId, OldStatus, NewStatus, ChangedByUserId, Timestamp)
        SELECT 
            i.Id, 
            d.Status, -- 'deleted' is a temporary table holding the OLD data
            i.Status, -- 'inserted' is a temporary table holding the NEW data
            ISNULL(i.ModifiedByUserId, i.UserId), -- The Admin who changed it (or the owner as a fallback)
            GETDATE()
        FROM inserted i
        INNER JOIN deleted d ON i.Id = d.Id
        WHERE i.Status <> d.Status; -- Only log if the status actually changed (e.g., Open to In Progress)
    END
END;
GO