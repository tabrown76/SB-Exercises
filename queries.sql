-- write your queries here
--1
SELECT *
FROM owners
FULL JOIN vehicles
ON owners.id = vehicles.owner_id;

--2
SELECT first_name, last_name, COUNT(*)
FROM owners
JOIN vehicles
ON owners.id = vehicles.owner_id
GROUP BY first_name, last_name
ORDER BY first_name ASC;

--3
SELECT first_name, last_name, CAST(SUM(price) / COUNT(*) AS numeric(10, 0)) AS average_price, COUNT(*)
FROM owners
JOIN vehicles 
ON owners.id = vehicles.owner_id
GROUP BY first_name, last_name
HAVING COUNT(*) > 1 AND CAST(SUM(price) / COUNT(*) AS numeric(10, 0)) >= 10000
ORDER BY first_name DESC;
