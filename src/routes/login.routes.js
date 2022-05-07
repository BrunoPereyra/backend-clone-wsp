const express = require("express")
const Router = express.Router()
const login = require("../controllers/login.controllers")

Router.post("/",login)
module.exports = Router