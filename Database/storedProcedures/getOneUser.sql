CREATE OR ALTER PROCEDURE getOneUser (
  @id VARCHAR(255)
)
AS 
BEGIN
     SELECT * FROM jituUsersTable
     WHERE id=@id
END
