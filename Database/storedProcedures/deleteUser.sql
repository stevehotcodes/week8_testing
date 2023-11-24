CREATE OR ALTER PROCEDURE deleteUser
(
    @id VARCHAR(255)
)
AS
BEGIN
    UPDATE jituUsersTable
    SET isDeleted=1
    WHERE id=@id AND isDeleted=0
END