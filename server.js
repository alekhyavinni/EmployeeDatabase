const express =require('express');
const mysql=require('mysql2'); 

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
        console.log(results)
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
    const sql=`INSERT INTO department (id,title,salary,department_id)
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
    const sql=`INSERT INTO department (id,first_name,last_name,role_id,manager_id)
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
    console.log(results)
   });
});

//update an employee
app.put('/api/employee-role/:')
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  