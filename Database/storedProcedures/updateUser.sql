CREATE OR ALTER PROCEDURE updateUser(
    @id VARCHAR(255),
    @fullName VARCHAR(255),
    @cohortNumber INT,
    @email VARCHAR(255)
    
)
AS
BEGIN
    UPDATE jituUsersTable
    SET fullName=@fullName, cohortNumber=@cohortNumber,email=@email
    WHERE id=@id AND isDeleted=0

END