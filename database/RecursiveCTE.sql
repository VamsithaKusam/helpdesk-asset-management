-- THE RECURSIVE CTE FOR THE CATEGORICAL HIERARCHY

WITH CategoryTree AS (
    -- Anchor member: Get root categories (ParentCategoryId is NULL)
    SELECT Id, Name, ParentCategoryId, CAST(Name AS NVARCHAR(MAX)) AS HierarchyPath, 0 AS Level
    FROM Categories
    WHERE ParentCategoryId IS NULL

    UNION ALL

    -- Recursive member: Get children and append to the path
    SELECT c.Id, c.Name, c.ParentCategoryId, 
           ct.HierarchyPath + ' -> ' + c.Name, 
           ct.Level + 1
    FROM Categories c
    INNER JOIN CategoryTree ct ON c.ParentCategoryId = ct.Id
)
SELECT * FROM CategoryTree ORDER BY HierarchyPath;