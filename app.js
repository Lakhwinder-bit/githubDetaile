const express = require('express')
require('dotenv').config();
const profileRouets = require('./routes/profileRoutes')
const path = require('path')
const PORT = process.env.PORT
const db = require('./utils/databaseUtils')
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
// IMPORTANT
app.set("views", path.join(__dirname, "view"));

db.getConnection()
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

  app.get("/", (req, res) => {
  res.render("home");
});

// app.use((req, res) => {
//     res.status(404).render("error", {
//         statusCode: 404,
//         message: "Page Not Found"
//     });
// });
app.use(express.urlencoded({ extended: true }));

// IMPORTANT notes
app.use(express.json());
app.use("/", profileRouets)

app.listen(PORT,()=>{
    console.log("Server is start...")
})
