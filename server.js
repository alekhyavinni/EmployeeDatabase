const express =require('express');
const mysql=require('mysql2'); 
const inquirer = require('inquirer');

const PORT=process.env.PORT || 3001;
const app=express();

//Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//connect to database
const db=mysql.createConnection(
    {
        host : 'localhost',
        user:'root',
        password:'Fruittella@1209',
        database:'companyEmployee_db'
    },
    console.log('connected to the companyEmployee_db')
);

//display the models
app.get('/api/department',(req,res)=>{
    const sql ='SELECT * FROM department';
    
    db.query(sql,(err,results)=>{
        if(err){
            res.status(500).json({error:err.message});
            return;
        }
        res.json({
            message: 'success',
            data: results

        });
    });
});

app.get('/api/role',(req,res)=>{
    const sql ='SELECT * FROM role';
    
    db.query(sql,(err,results)=>{
        if(err){
            res.status(500).json({error:err.message});
            return;
        }
        res.json({
            message: 'success',
            data: results

        });
        console.log(results)
    });
});

app.get('/api/employee',(req,res)=>{
    const sql ='SELECT * FROM employee';
    
    db.query(sql,(err,results)=>{
        if(err){
            res.status(500).json({error:err.message});
            return;
        }
        res.json({
            message: 'success',
            data: results

        });
        console.log(results)
    });
});

//add a department
app.post('/api/add-department',({body},res)=>{
    const sql=`INSERT INTO department (id,department)
    VALUES (?,?)`;
   const params=[body.id,body.department];
   db.query(sql,params,(err,results)=>{
    if(err){
        res.status(400).json({error:err.message});
    }
    res.json({
        message: 'success',
        data:body
    });
    console.log(results)
   });
});

//add a role
app.post('/api/add-role',({body},res)=>{
    const sql=`INSERT INTO role (id,title,salary,department_id)
    VALUES (?,?,?,?)`;
   const params=[body.id,body.title,body.salary,body.department];
   db.query(sql,params,(err,results)=>{
    if(err){
        res.status(400).json({error:err.message});
    }
    res.json({
        message: 'success',
        data:body
    });
    console.log(results)
   });
});

//add an employee
app.post('/api/add-employee',({body},res)=>{
    const sql=`INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
    VALUES (?,?,?,?,?)`;
   const params=[body.id,body.first_name,body.last_name,body.role_id,body.manager_id];
   db.query(sql,params,(err,results)=>{
    if(err){
        res.status(400).json({error:err.message});
    }
    res.json({
        message: 'success',
        data:body
    });
   
   });
});

//update an employee
app.put('/api/employee-role/:id',(req,res)=>{
    const sql='UPDATE role SET title=? WHERE id =?'
    const params=[req.body.title,req.params.id];

    db.query(sql,params,(err,result)=>{
        if(err){
            res.status(400).json({error:err.message});
        }else if(!result.affectedRows){
            res.json({
                message:'employee not found'
            });
        }
        else{
            res.json({
                message:'success',
                data:req.body,
                changes:result.affectedRows
            })
        }
    })
})

//Application allows users to view the total utilized budget of a department—in other words, the combined salaries of all employees in that department
app.get('/api/dept_salary',(req,res)=>{
    const sql="SELECT department.department,SUM(role.Salary) AS Tot_DeptSalary  FROM department JOIN role ON department.id = role.department_id GROUP BY department"
    db.query(sql,(err,results)=>{
       if(err){
        res.status(500).json({err:message});
        return;
       } 
       res.json({
        message:'success',
        data:results
       })
    })
})

app.delete('/api/delete_emp',({body},res)=>{
    const sql="DELETE FROM department WHERE id IN(SELECT role.department_id  FROM ROLE WHERE id =(SELECT role_id FROM employee WHERE id=?))"
    const params=[body.id];
    db.query(sql,params,(err,results)=>{
     if(err){
         res.status(400).json({error:err.message});
     }
     res.json({
         message: 'success',
         data:body
     });
     console.log(results)
    });
 });



app.use((req, res) => {
    res.status(404).end();
  });
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


function startCompany(){
    inquirer.prompt([
        {
            type:'list',
            name:'action',
            message:'-------***********!!!!!Select an option!!!!!***********------------',
            choices:[
                'View all employees',
                'Add an employee',
                'Update an employee role',
                'View all roles',
                'Add a role',
                'View all departments',
                'Add a department',
                'Total utilized budget of each department',
                'Delete Employee By Id',
                new inquirer.Separator(),
                'Exit',
                new inquirer.Separator(),
            ]
        }
    ]).then(answer =>{
        switch(answer.action){

            case 'View all departments':
                  db.query('SELECT * FROM department',(err,results)=>{
                    if(err){
                        console.error('Error fetching departments:',err);
                        return;
                    }
                    console.log('All Departments:');
                    results.forEach(department => {
                        console.log('-------------------------------')
                        console.log(`| ID: ${department.id} | Department: ${department.department} |`);
                        console.log('-------------------------------')
                    })
                    startCompany();
                  })     
                  break;
            
            case 'View all roles':
                db.query('SELECT * FROM role',(err,results)=>{
                    if(err){
                        console.error('Error fetching role:',err);
                        return;
                    }
                    console.log('All roles:');
                    results.forEach(role =>{
                        console.log('-------------------------------------------------------------------------------')
                        console.log(`|ID : ${role.id} | Title:${role.title} | Salary:${role.salary} | DepartmentId :${role.department_id}|`)
                        console.log('-------------------------------------------------------------------------------')
                    })
                    startCompany();
                  })     
                  break;
            

            case  'View all employees':
                db.query('SELECT * FROM employee',(err,results)=>{
                    if(err){
                        console.error('Error fetching employees:',err);
                        return;
                    }
                    console.log('All employees:');
                    results.forEach(employee =>{
                        console.log('|------------------------------------------------------------------------------------------------|')
                        console.log(`|ID : ${employee.id} | FirstName:${employee.first_name}| LastName:${employee.last_name} |RoleId :${employee.role_id} | ManagerId :${employee.manager_id} |`)
                        console.log('|------------------------------------------------------------------------------------------------|')
                    })
                    startCompany();
                  })     
                  break;

            case  'Add a department':
                  inquirer.prompt([
                    {
                        type:'input',
                        name:'id',
                        message:'enter the Department ID'
                    },
                    {
                        type:'input',
                        name:'department',
                        message:'enter the Department name'
                    }
                  ]).then(answers=>{
                    const department={
                        id:parseInt(answers.id),
                        department:answers.department
                    };
                    db.query('INSERT INTO department SET ?',department,(err,result)=>{
                            if (err) {
                                console.error('Error adding department:', err);
                            } else {
                                console.log('Department added successfully!');
                            }  
                        startCompany()
                    })
                  })
                  break

            case  'Add a role':
                inquirer.prompt([
                    {
                        type:'input',
                        name:'id',
                        message:'enter the employee ID'
                    },
                    {
                        type:'input',
                        name:'title',
                        message:'enter the employee title'
                    },
                    {
                        type:'input',
                        name:'salary',
                        message:'enter the employee salary'
                    },
                    {
                        type:'input',
                        name:'department_id',
                        message:'enter the Department ID'
                    }
                  ]).then(answers=>{
                    const role={
                        id:parseInt(answers.id),
                        title:answers.title,
                        salary:parseFloat(answers.salary),
                        department_id:parseInt(answers.department_id)
                    };
                    db.query('INSERT INTO role SET ?',role,(err,result)=>{
                            if (err) {
                                console.error('Error adding role:', err);
                            } else {
                                console.log('role added successfully!');
                            }  
                        startCompany()
                    })
                  })
                  break

            case 'Add an employee':
                inquirer.prompt([
                    {
                        type:'input',
                        name:'id',
                        message:'enter the employee ID'
                    },
                    {
                        type:'input',
                        name:'first_name',
                        message:'enter the employee first_name'
                    },
                    {
                        type:'input',
                        name:'last_name',
                        message:'enter the employee last_name'
                    },
                    {
                        type:'input',
                        name:'role_id',
                        message:'enter the role ID'
                    },
                    {
                        type:'input',
                        name:'manager_id',
                        message:'enter the manager ID'
                    }
                  ]).then(answers=>{
                    const employee={
                        id:parseInt(answers.id),
                        first_name:answers.first_name,
                        last_name:answers.last_name,
                        role_id:parseInt(answers.role_id),
                        manager_id:parseInt(answers.manager_id)

                    };
                    db.query('INSERT INTO employee SET ?',employee,(err,result)=>{
                            if (err) {
                                console.error('Error adding employee:', err);
                            } else {
                                console.log('employee added successfully!');
                            }  
                        startCompany()
                    })
                  })
                  break

            case 'Update an employee role':
                  inquirer.prompt([
                    {
                        type:'input',
                        name:'id',
                        message:'enter the employee role-ID to update the employee role'
                    },
                    {
                        type:'input',
                        name:'title',
                        message:'enter the new employee role'
                    }, 
                    
                  ]).then(answers=>{
                    const employeeRole ={
                        id:parseInt(answers.id),
                        title:answers.title,
                        
                    }
                    db.query('UPDATE role SET title=? WHERE id=?',[employeeRole.title,employeeRole.id],(err,result)=>{
                        if (err) {
                            console.error('Error adding employee:', err);
                        }
                        else{
                            console.log('employee added successfully!');
                        }  
                    startCompany()  
                    })
                  })
                  break


            case 'Total utilized budget of each department':
                db.query('SELECT department.department,SUM(role.Salary) AS Tot_DeptSalary FROM department JOIN role ON department.id = role.department_id GROUP BY department',(err,results)=>{
                if(err){
                    console.error('Error Fecthing the Data',err)
                    return;
                }
                console.log("Department Wise Salaries ")
                results.forEach(department=>{
                    console.log('-------------------------------------------------------------------------------')
                    console.log(`|Department : ${department.department} | Total Amount:${department.Tot_DeptSalary} |`)
                    console.log('-------------------------------------------------------------------------------')
                })
                startCompany();
            })
            break

            case 'Delete Employee By Id':
                inquirer.prompt([
                    {
                        type:'input',
                        name:'id',
                        message:'Enter the Employee Id you want to delete-'
                    }
                ]).then(answers=>{
                    const employee={
                        id:parseInt(answers.id)
                    }
                
                db.query('DELETE FROM department WHERE id IN(SELECT role.department_id  FROM ROLE WHERE id =(SELECT role_id FROM employee WHERE id=?))',employee.id,(err,results)=>{
                if(err){
                    console.error('Error Fecthing the Data',err)
                    return;
                }
                else {
                    console.log('All th employee details are deleted successfully!');
                }  
            startCompany()
        })
      })
      break


            case 'Exit':
                console.log('Exciting from Database!');
                db.end();
                return;
        }
        // startCompany();
    })
}

startCompany();

 

  