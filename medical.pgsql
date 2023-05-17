DROP DATABASE IF EXISTS medical_center_db;
CREATE DATABASE medical_center_db;

\c medical_center_db;

CREATE TABLE medical_center (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    address VARCHAR(20),
    phone_number INT
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT,
    insurance_carrier VARCHAR(20) NOT NULL,
    policy_num INT NOT NULL
);

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT,
    specialty VARCHAR(15)
);

CREATE TABLE diseases (
    id SERIAL PRIMARY KEY,
    name VARCHAR(15) UNIQUE NOT NULL
);

CREATE TABLE medical_center_doctors (
    id SERIAL PRIMARY KEY,
    medical_center_id INT REFERENCES medical_center,
    doctor_id INT REFERENCES doctors
);

CREATE TABLE patients_doctors (
    id SERIAL PRIMARY KEY,
    doctor_id INT REFERENCES doctors,
    patient_id INT REFERENCES patients
);

CREATE TABLE patients_diseases (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients,
    disease_id INT REFERENCES diseases
);

INSERT INTO medical_center (name)
VALUES ('UVA Medical');

INSERT INTO patients (first_name, insurance_carrier, policy_num)
VALUES 
    ('John', 'Blue Cross', 12345),
    ('Jane', 'Any Insurance Co', 67890);

INSERT INTO doctors (first_name, specialty)
VALUES 
    ('Bill', 'cardiology'),
    ('Sue', 'podiatry');

INSERT INTO diseases (name)
VALUES 
    ('hand-foot-mouth'),
    ('disease #2');

INSERT INTO medical_center_doctors (medical_center_id, doctor_id)
VALUES
    (1, 1),
    (1, 2);

INSERT INTO patients_doctors (doctor_id, patient_id)
VALUES
    (1, 2),
    (2, 1);

INSERT INTO patients_diseases (patient_id, disease_id)
VALUES 
    (1, 1),
    (2, 2);
