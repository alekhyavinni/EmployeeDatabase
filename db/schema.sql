DROP DATABASE IF EXISTS companyEmployee_db;
CREATE DATABASE companyEmployee_db;

USE companyEmployee_db;


CREATE TABLE department(
    id INT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role(
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
 );

CREATE TABLE employee(
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id  INT,
    FOREIGN KEY(role_id)
    REFERENCES role(id)
);