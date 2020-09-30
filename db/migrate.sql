CREATE TABLE IF NOT EXISTS users
(
    email    VARCHAR(255) NOT NULL,
    password VARCHAR(60)  NOT NULL,
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS texts
(
    id       INTEGER PRIMARY KEY,
    week     INTEGER       NULL,
    title    VARCHAR(255)  NOT NULL,
    longtext VARCHAR(3000) NOT NULL
);

