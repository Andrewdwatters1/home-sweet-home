CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR,
  lastName VARCHAR,
  state VARCHAR(2),
  email TEXT NOT NULL UNIQUE
);