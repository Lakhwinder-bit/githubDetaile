
const express = require('express')
const userouter = express.Router();
const controllers = require("../controllers/profileController");

userouter.post("/home", controllers.anylizeGithub);


module.exports = userouter;