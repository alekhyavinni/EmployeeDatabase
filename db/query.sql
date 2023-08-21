SELECT department.department,SUM(role.Salary) AS Tot_DeptSalary 
FROM department 
JOIN role ON department.id = role.department_id 
GROUP BY department;


DELETE FROM department WHERE id IN(SELECT role.department_id  FROM ROLE 
WHERE id =(SELECT role_id FROM employee WHERE id=12347));

DELETE FROM department WHERE id IN(SELECT role.department_id  FROM ROLE 
WHERE id =(SELECT role_id FROM employee WHERE id=12347));

