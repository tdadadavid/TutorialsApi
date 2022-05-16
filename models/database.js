const mysql = require('mysql');
const config = require('../config/config');


// create connection to the database
const conn = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
});


conn.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Successfully connected to the database.");
});


module.exports = conn;