const mysql = require('mysql2')
const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"user@123",
    database:"githubdetails"
})
module.exports = pool.promise();