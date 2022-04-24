const express = require("express")
const Router = express.Router()
const signup = require("../controllers/signup.controllers")

Router.post("/",signup)

module.exports = Router