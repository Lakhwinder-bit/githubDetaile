require("dotenv").config();
const host = process.env.host;
const user = process.env.user;
const password = process.env.password;
const database = process.env.database;
const mysql = require("mysql2");
const pool = mysql.createPool({
  host,
  user,
  password,
  database,
});
module.exports = pool.promise();
