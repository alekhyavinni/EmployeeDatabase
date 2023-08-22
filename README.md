# EmployeeDatabase
A company's employee database which enables you to view and manage the departments, roles, and employees in my company . using Node.js, Inquirer, and MySQL

```
# Description
I start the application, I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
I choose to view all departments, I am presented with a formatted table showing department names and department ids
I choose to view all roles, I am presented with the job title, role id, the department that role belongs to, and the salary for that role
I choose to view all employees, I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
I choose to add a department, I am prompted to enter the name of the department and that department is added to the database
I choose to add a role, I am prompted to enter the name, salary, and department for the role and that role is added to the database
I choose to add an employee, I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
I choose to update an employee role, I am prompted to select an employee to update and their new role and this information is updated in the database
I choose Total utilized budget of a departments ,I am presented with all the combined salaries of all employees in that department.
I choose Delete Employee by Id ,I am prompted to enter the employye id then all the rows related to the employee are deleted from all tables.

```

```
# Installation :

npm i express,nodemon,dotenv,path,mysql2

```

```
# To generate svg :

npm run start / node server.js

```
```
# Usage :
Download the code to your local. Perform npm i to install all the packages. Answer the questions asked in the command prompt like
[
'View all employees',
                'Add an employee',
                'Update an employee role',
                'View all roles',
                'Add a role',
                'View all departments',
                'Add a department',
                'Total utilized budget of each department',
                'Delete Employee By Id',
                'QUIT'
]

```

```
# Video

[Watch the Video](https://youtu.be/k4QDB8aEuSQ)

```

# license
Please refer to the License in repo

# Contributor:
Alekhya Erikipati ©2023 All Rights Reserved.