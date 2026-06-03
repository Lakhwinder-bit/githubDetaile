const express = require('express')
require('dotenv').config();
const profileRouets = require('./routes/profileRoutes')
const PORT = process.env.PORT
const db = require('./utils/databaseUtils')
const app = express();


// IMPORTANT notes
app.use(express.json());
app.use("/", profileRouets)

app.listen(PORT,()=>{
    console.log("Server is start...")
})
