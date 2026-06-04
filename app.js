const express = require('express')
require('dotenv').config();
const profileRouets = require('./routes/profileRoutes')
const PORT = process.env.PORT
const db = require('./utils/databaseUtils')
const app = express();


db.getConnection()
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

// IMPORTANT notes
app.use(express.json());
app.use("/", profileRouets)

app.listen(PORT,()=>{
    console.log("Server is start...")
})
