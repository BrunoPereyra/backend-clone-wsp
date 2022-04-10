const express = require("express")
const Router = express.Router()
const home = require("../controllers/home.controllers")

Router.get("/",home)
module.exports = Router