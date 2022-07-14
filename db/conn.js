const mysql = require("mysql2")

const conn = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.localhost,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});


conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

module.exports = conn;