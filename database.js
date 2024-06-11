const mysql=require('mysql');
const connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Nav14@#$***',
    database:'my_node'
});
connection.connect((err)=>{
    if(err){
        throw err;
    }
    else{
        console.log("database connected successfully!!");
    }
});

module.exports=connection;