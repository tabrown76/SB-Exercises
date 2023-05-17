DROP DATABASE IF EXISTS soccer_db;
CREATE DATABASE soccer_db;

\c soccer_db;

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(20) UNIQUE NOT NULL,
    city VARCHAR(20) NOT NULL,
    coach VARCHAR(20) NOT NULL
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    player VARCHAR(20) NOT NULL,
    team_name INT REFERENCES teams
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20),
    team_name INT REFERENCES teams
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    match_id INT UNIQUE NOT NULL,
    team1 INT REFERENCES teams,
    team2 INT REFERENCES teams,
    winner BOOLEAN
);

CREATE TABLE referees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20),
    matches INT REFERENCES matches
);

CREATE TABLE dates (
    id SERIAL PRIMARY KEY,
    start_date INT NOT NULL,
    end_date INT NOT NULL,
    team_name INT NOT NULL REFERENCES teams
);

