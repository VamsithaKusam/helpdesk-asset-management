
-- Create Stored Procedure: AssignAssetToUser

CREATE OR ALTER PROCEDURE AssignAssetToUser
    @AssetTag NVARCHAR(100),
    @UserId INT
AS
BEGIN
    -- This prevents extra messages from slowing down the API
    SET NOCOUNT ON;

    BEGIN TRY
        -- Start the transaction (the "all-or-nothing" wrapper)
        BEGIN TRANSACTION;

        DECLARE @AssetId INT;
        DECLARE @CurrentStatus NVARCHAR(50);

        -- Step 1: Find the asset and check its status
        SELECT @AssetId = Id, @CurrentStatus = Status 
        FROM Assets 
        WHERE AssetTag = @AssetTag;

        -- If asset doesn't exist, throw an error
        IF @AssetId IS NULL
        BEGIN
            THROW 50001, 'Asset not found.', 1;
        END

        -- If asset is already assigned, throw an error
        IF @CurrentStatus <> 'Available'
        BEGIN
            THROW 50002, 'Asset is not available for assignment.', 1;
        END

        -- Step 2: Update the asset's status to "Assigned"
        UPDATE Assets
        SET Status = 'Assigned'
        WHERE Id = @AssetId;

        -- Step 3: Insert a record into the assignment history table
        INSERT INTO AssetAssignments (AssetId, UserId, AssignedDate)
        VALUES (@AssetId, @UserId, GETDATE());

        -- If we made it this far without errors, save the changes permanently!
        COMMIT TRANSACTION;

    END TRY
    BEGIN CATCH
        -- If ANY error happened above, undo everything (Rollback)
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Pass the error message back to the .NET API
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;
GO