const http = require('http');
const express = require('express')
require('dotenv').config();
const PORT = process.env.PORT

const app = express();

app.get('/',(req,res)=>{
console.log(req.url, req.method);
res.status(200);
res.send("Welcome to root URL of Server");

})

app.get('/home',(req,res)=>{
console.log(req.url, req.method);
res.status(200);
res.send("Welcome to Home page...");

})



app.listen(PORT,()=>{
    console.log("Server is start...")
})
