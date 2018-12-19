SELECT * FROM users
WHERE lower(email) = lower($1);