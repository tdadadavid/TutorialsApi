const mysql = require('mysql');
const {DBConfig: db} = require('../config/db.config');


// create connection to the database
const conn = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
});


conn.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Successfully connected to the database.");
});


module.exports = conn;