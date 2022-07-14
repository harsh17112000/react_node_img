require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql2");
const conn = require("./db/conn");
const cors = require("cors");
const router = require("./Routes/router");
const port = 8000;
const path = require('path')


// middleware
app.use(express.json());
app.use(express.json())
// app.use(cors({
//     origin:true,
//     methods:["POST","GET", "PUT", "DELETE"],
//     credentials:true
//   }));

  app.use("/uploads", express.static("./uploads"));
  

// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin',"X-Requested-With,Content-Type,Accept,Authorization"
//     );
//     res.setHeader("Access-Control-Allow-Methods","GET","POST","PATCH","DELETE");
//     next();
// })

app.use(router);

app.listen(port, () => {
    console.log("server is started");
})

















// values(?),[name] it represent variable names which we insert

// {name:name, email:email, age:age, mobile:mobile, work:work, add:add, desc:desc}

