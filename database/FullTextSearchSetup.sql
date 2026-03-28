
-- ==========================================
-- 3. Full-Text Search Configuration
-- WHY: Allows users to search for "broken screen" and find tickets even if they typed "screen is broken".
-- ==========================================
-- Note: SQL Server Express Advanced is required for Full-Text Search. 
-- This creates the catalog and index on the Tickets table.
IF NOT EXISTS (SELECT 1 FROM sys.fulltext_catalogs WHERE name = 'HelpdeskFTCatalog')
BEGIN
    CREATE FULLTEXT CATALOG HelpdeskFTCatalog AS DEFAULT;
END;
GO

-- We create a unique index to attach the full-text search to.
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'UIX_Tickets_Id')
BEGIN
    CREATE UNIQUE NONCLUSTERED INDEX UIX_Tickets_Id ON Tickets(Id);
END;
GO

-- Create the Full-Text Index on Title and Description
CREATE FULLTEXT INDEX ON Tickets(Title, Description) 
KEY INDEX UIX_Tickets_Id 
ON HelpdeskFTCatalog;
GO