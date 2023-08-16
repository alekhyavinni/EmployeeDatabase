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
    const sql=`INSERT INTO department (id,name)
    VALUES (?,?)`;
   const params=[body.id,body.name];
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
            message:'-----------------------!!!!!Select an option!!!!!-------------------------',
            choices:[
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
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
                        console.log(`ID: ${department.id} | Name: ${department.name}`);
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
                        console.log(`ID : ${role.id} | Title:${role.title}| Salary:${role.salary} |DepartmentId :${role.department_id}`)
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
                        console.log(`ID : ${employee.id} | FirstName:${employee.first_name}| LastName:${employee.last_name} |RoleId :${employee.role_id} | ManagerId :${employee.manager_id}`)
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
                        name:'name',
                        message:'enter the Department name'
                    }
                  ]).then(answers=>{
                    const department={
                        id:parseInt(answers.id),
                        name:answers.name
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
                        salary:answers.salary,
                        manager_id:answers.manager_id
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


            case 'Update an employee role':


            case 'Exit':
                console.log('Exciting from Database!');
                db.end();
                return;
        }
        // startCompany();
    })
}

startCompany();

 

  