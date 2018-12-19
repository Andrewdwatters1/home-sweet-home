INSERT INTO users(firstname, lastname, email, state)
VALUES($1, $2, lower($3), $4) 
RETURNING *;