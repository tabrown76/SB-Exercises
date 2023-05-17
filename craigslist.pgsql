DROP DATABASE IF EXISTS craigslist_db;
CREATE DATABASE craigslist_db;

\c craigslist_db;

CREATE TABLE regions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL,
    zipcode INT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL,
    user_zipcode INT NOT NULL,
    preferred_region INT REFERENCES regions 
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20)
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    text_content VARCHAR(200) NOT NULL,
    username INT REFERENCES users,
    location INT,
    region INT REFERENCES regions,
    category INT REFERENCES categories
);


