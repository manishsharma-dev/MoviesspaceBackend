const sql = require('mssql');
const config=require('../dbConfig');

var columnManager = module.exports = {
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
             ViewFilterData: function(callback,req){       
try{
    const pool=new sql.ConnectionPool(config,err=>{
        pool.request()
        .input('tableName',sql.NVarChar(255), req.body.tableName)
        .input('filter',sql.NVarChar(255), req.body.filter)
            .execute('MVGETFilterTABLEDATA',(err,result)=>{                     
              callback(null,result.recordsets);        
    }); 
    })
}
catch(ex){
    console.log(ex.message);
}        
    }    
};