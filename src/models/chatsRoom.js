const mongoose = require("mongoose")
const { Schema, model } = mongoose

const SchemaChatsRoom = new Schema({
    Rooms: Array,
    idWs: String,
    nameUser: String,
    date:Date,
    user: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }]
})
SchemaChatsRoom.set("toJSON", {
    transform: (returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v

    }
})

const ChatsRoom = model("chatsRoom", SchemaChatsRoom)
module.exports = ChatsRoom