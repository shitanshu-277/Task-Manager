var mysql = require('mysql2');
require('dotenv').config();
const util=require('util');
var con = mysql.createConnection({
  host: process.env.HOST,
  port:3306,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query=util.promisify(con.query).bind(con);

module.exports=con;