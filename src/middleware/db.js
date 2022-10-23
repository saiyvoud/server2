import mysql from "mysql";

const conect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "course2"
});

conect.connect(function(err,result){
    if(err) throw err
    return console.log("Mysql Connected!")
})

export default conect
