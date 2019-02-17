const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const os =require('os');
const sqlserver = require('mssql');
const config=require('./dbConfig');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//module imports
var users = require('./Controllers/users');
var tableManager = require('./Controllers/tableManager');
var columnManager  = require('./Controllers/columnsManager');
//module imports


app.use(function (req, res, next) {        
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4884');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
    res.setHeader('Access-Control-Allow-Credentials', true);       
    next();  
});

app.get('/', (req, res) => {
    res.send('Hello World!');
   
});

app.listen(3333, () => {
    console.log('Example app listening on port port!');    
});

app.post('/api/getAdminGridColumn',(req,res)=>{
    try{
switch(req.body.tableName){
            case "MVUsersView":
            users.ViewColumns(function(error,rows){
                if(error) res.send([]);
                else{
                res.send(rows);
            }
            },req)
            break;
            case "MVVIEWSLISTVIEW":
            tableManager.ViewColumns(function(error,rows){
                if(error) res.send([]);
                else{
                res.send(rows);
            }
            },req)
            break;
            case "MVVIEWCOLUMNSVIEW":
            columnManager.ViewColumns(function(error,rows){
                if(error) res.send([]);
                else{
                res.send(rows);
            }
            },req)
            break;
}
}
catch(ex){
    console.log(ex.message);
}
});

app.post('/api/getSelectDropdownData',(req,res)=>{
    try{
switch(req.body.tableName){
            case "MVUsersView":
            users.ViewDropdown(function(error,rows){
                if(error) res.send([]);
                else{
                res.send(rows);
            }
            },req)
            break;
            case "MVSysTableViewsView":
            tableManager.ViewDropdown(function(error,rows){
                if(error) res.send([]);
                else{
                res.send(rows);
            }
            },req)
            break;
}
}
catch(ex){
    console.log(ex.message);
}
});

app.post('/api/getAdminGridData',(req,res)=>{
    try{
switch(req.body.tableName){
            case "MVUsersView":
            users.ViewData(function(error,rows){
                if(error) res.send([]);
                else{
                res.send(rows);
            }
            },req)
            break;
            case "MVVIEWSLISTVIEW":
            tableManager.ViewData(function(error,rows){
                if(error) res.send([]);
                else{
                res.send(rows);
            }
            },req)
            break;
}
}
catch(ex){
    console.log(ex.message);
}
});

app.post('/api/postData',(req,res)=>{
    try{
switch(req.body.tableName){
            case "USERS":
            users.Insert(function(error,rows){
                if(error) res.send([]);
                else{
                res.send(rows);
            }
            },req)
            break;
            case "MVVIEWSLISTVIEW":
            tableManager.Insert(function(error,rows){
                if(error) res.send([]);
                else{
                res.send(rows);
            }
            },req)
            break;
}
}
catch(ex){
    console.log(ex.message);
}
});

app.post('/api/getFilterdata',(req,res)=>{
    try{
        switch(req.body.tableName){
                    case "MVVIEWCOLUMNSVIEW":
                    columnManager.ViewFilterData(function(error,rows){
                        if(error) res.send([]);
                        else{
                        res.send(rows);
                    }
                    },req)
                    break;                    
        }
        }
        catch(ex){
            console.log(ex.message);
        }
})

//Run app, then load http://localhost:3333 in a browser to see the output.