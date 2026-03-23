INSERT INTO Roles (Name) VALUES ('Admin');
INSERT INTO Roles (Name) VALUES ('Employee');

select * from dbo.Roles;


INSERT INTO Users (Name, Email, PasswordHash, RoleId)
VALUES 
('Admin User', 'admin@test.com', 'admin123', 1),
('Employee User', 'employee@test.com', 'emp123', 2);

select * from dbo.Users;


