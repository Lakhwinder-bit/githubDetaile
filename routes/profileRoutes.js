
const express = require('express')
const userouter = express.Router();
const controllers = require("../controllers/profileController");

userouter.post("/home", controllers.anylizeGithub);
userouter.get("/data", controllers.giveData);
userouter.delete("/delete",controllers.deleteData)


module.exports = userouter;