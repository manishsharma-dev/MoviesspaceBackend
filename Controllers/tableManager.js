const sql = require('mssql');
const config=require('../dbConfig');

var tableManager = module.exports = {
    ViewColumns: function(callback,req){       
try{
    const pool=new sql.ConnectionPool(config,err=>{
        pool.request()
        .input('tableName',sql.NVarChar(255), req.body.tableName)
            .execute('MVGETTABLECOLUMNS',(err,result)=>{                     
              callback(null,result.recordsets);        
    }); 
    })
}
catch(ex){
    console.log(ex.message);
}        
    },
    ViewData: function(callback,req){       
try{
    const pool=new sql.ConnectionPool(config,err=>{
        pool.request()
        .input('tableName',sql.NVarChar(255), req.body.tableName)
            .execute('MVGETALLTABLEDATA',(err,result)=>{                      
              callback(null,result.recordsets);        
    }); 
    })
}
catch(ex){
    console.log(ex.message);
}
       
    },
    ViewDropdown: function(callback,req){       
        try{
            const pool=new sql.ConnectionPool(config,err=>{
                pool.request()
                .input('tableName',sql.NVarChar(255), req.body.tableName)
                    .execute('MVGETDROPDOWNDATA',(err,result)=>{                      
                      callback(null,result.recordsets);        
            }); 
            })
        }
        catch(ex){
            console.log(ex.message);
        }
               
            },
    Insert: function(callback,req){
        try{
            const Insertpool=new sql.ConnectionPool(config,err=>{
                Insertpool.request()
                .input('tableName',sql.NVarChar(255), req.body.tableName)
                .input('viewName',sql.NVarChar(255), req.body.viewName)
                .input('createdBy',sql.NVarChar(255), req.body.createdBy)
                .input('Responsetable',sql.NVarChar(255), req.body.Responsetable)
                .execute('MVSPINSERTVIEWSLIST',(err,result)=>{
                    if(err) {
                        callback(null,err.originalError.message);
                        return;
                    }  
                      callback(null,result.recordsets);        
            }); 
            })
        }
        catch(ex){
            console.log(ex.message);
        }
        
    },
    Update: function(){
        console.log('Update called');
    },
    Delete: function(){
        console.log('Delete called');
    }
};