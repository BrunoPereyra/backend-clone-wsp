const mongoose = require("mongoose")

const { Schema, model } = mongoose

const SchemaUser = new Schema({
    name: String,
    nameUser: String,
    passwordHash: String,
    gmail: String,
    photoUrl: String,
    contacts: Array,
    date: Date,
    chats: [{
        type: Schema.Types.ObjectId,
        ref: "chats"
    }]
})
SchemaUser.set("toJSON", {
    transform: (returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
        delete returnedObject.gmail
    }
})

const User = model("users", SchemaUser)
module.exports = User
