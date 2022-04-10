const mongoose = require("mongoose")
const { Schema, model } = mongoose

const SchemaChats = new Schema({
    message: Array,
    date: Date,
    nameUser: String,
    user: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }]
})
SchemaChats.set("toJSON", {
    transform: (returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v

    }
})

const Chats = model("chats", SchemaChats)
module.exports = Chats