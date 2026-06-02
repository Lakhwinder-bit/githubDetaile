const express = require('express')
require('dotenv').config();
const profileRouets = require('./routes/profileRoutes')
const PORT = process.env.PORT
const db = require('./utils/databaseUtils')
const app = express();

db.execute('SELECT * FROM githubuserdetails')
.then(([rows, fields]) =>{
    console.log('Getting from DB',rows)
})
.catch(error => {
console.log('Error while reading home records',error)
});


// IMPORTANT
app.use(express.json());
app.use("/", profileRouets)

app.listen(PORT,()=>{
    console.log("Server is start...")
})
