SELECT department.department,SUM(role.Salary) AS Tot_DeptSalary 
FROM department 
JOIN role ON department.id = role.department_id 
GROUP BY department;
