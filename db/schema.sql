DROP DATABASE IF EXISTS companyEmployee_db;
CREATE DATABASE companyEmployee_db;

USE companyEmployee_db;


CREATE TABLE department(
    id INT PRIMARY KEY ,
    department VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    id INT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL ,
    FOREIGN KEY (department_id)
    REFERENCES department(id) ON DELETE CASCADE
 );

CREATE TABLE employee(
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id  INT NOT NULL,
    FOREIGN KEY(role_id)
    REFERENCES role(id) ON DELETE CASCADE
);