var mysql = require('mysql2');
const util=require('util');
var con = mysql.createConnection({
  host: "127.0.0.1",
  port:3306,
  user: "root",
  password: "12345678",
  database: "TODO_DB"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query=util.promisify(con.query).bind(con);

module.exports=con;