CREATE OR ALTER PROCEDURE createNewUSer(
    @id VARCHAR(255),
    @fullName VARCHAR(255),
    @cohortNumber INT ,
    @email VARCHAR(255) ,
    @password VARCHAR(MAX) 
)
AS 
BEGIN
    INSERT INTO jituUsersTable(id,fullName,cohortNumber,email,password)
    VALUES(@id,@fullName,@cohortNumber,@email,@password)
END