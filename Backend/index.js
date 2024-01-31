global.con = require('./sql_connection.js')
const express = require('express');
var cors = require("cors");
const cookieParser = require('cookie-parser');
const session=require('express-session');
const app=express();
app.use(cookieParser())
const PORT=3000;
app.use(cors({
    origin: ["http://localhost:4200"],
    credentials:true
  },
));

const bodyParser=require('body-parser');
const userRoutes=require('./routes/user.js');
const todoRoutes=require('./routes/todo.js');
const {redisStore}=require('./redis_connection.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:'Your_Secret_Key',
    resave: false,
    saveUninitialized:false,
    store:redisStore,
    cookie: {
      maxAge:Date.now()+1000,
      httpOnly:false,
      proxy:true
    }
}))
app.use('/user',userRoutes);
app.use('/todo',todoRoutes);

app.listen(PORT,()=>{
    console.log(`app is listening on ${PORT}`);
})