const express = require("express")
const Router = express.Router()
const chats = require("../controllers/chats.controllers")

Router.post("/", chats)
module.exports = Router