const ChatsRoom = require("./models/chatsRoom")
const User = require("./models/user")

const HomeRoom = async (name, socketId) => {

    const UserRoom = await ChatsRoom.findOne({ nameUser: name })
    let ressOk = {}
    let ressErr = {}

    if (UserRoom) {
        UserRoom.idWs = socketId
        await UserRoom.save().then(() => {
            ressOk = {
                ress: { Rooms: UserRoom },
                WhatHappened: "new id user good"
            }
            return { ressOk, ressErr }
        }).catch((err) => {
            ressErr = {
                ress: err,
                WhatHappened: "new id user error"
            }
        })
        return { ressErr, ressOk }
    } else {
        ressErr = {
            ress: "name User Error",
            WhatHappened: "name User Error"
        }
        return { ressErr, ressErr }
    }

}

const addUser = async (id, name, nameRoom) => {

    const UserName = await User.findOne({ nameUser: name })
    const UserRoom = await ChatsRoom.findOne({ nameUser: name })
    let ressOk = {}
    let ressErr = {}
    if (UserName == null) {
        ressErr = { ress: "user null", WhatHappened: "user null" }
        return { ressOk, ressErr }
    }
    if (UserName) {
        if (UserRoom == null) {
            const chatNewConnect = new ChatsRoom({
                Rooms: [{
                    Room: nameRoom,
                    msj: [],
                }],
                idWs: id,
                nameUser: name
            })

            await chatNewConnect.save().then(() => {
                ressOk = {
                    ress: { nameRoom, name },
                    WhatHappened: "add new user room goood"
                }
                return { ressOk }
            }).catch((err) => {
                ressErr = {
                    ress: err,
                    WhatHappened: "in add new user room error"
                }
                return { ressErr }
            })
        }
        return { ressOk, ressErr }

    } else if (!name || !nameRoom) {
        ressErr = {
            ress: "name? room? wtf men",
            WhatHappened: "Username and nameRoom are required or not exist"
        }
        return { ressOk, ressErr }
    }
}

const SaveMsj = async (socketId, nameUser, nameRoom, message) => {

    const UserRooms = await ChatsRoom.findOne({ nameUser: nameUser })

    let ressOk = {}
    let ressErr = {}
    message.toString()

    if (UserRooms.idWs == socketId && nameRoom && typeof (message) == String) {
        const addmsj = await UserRooms.Rooms.find(room => room.Room == nameRoom)
        addmsj.msj.push({
            msj: message,
            date: Date
        })
        addmsj.save().then(() => {
            ressOk = "save msj ok"
        }).catch(() => {
            ressErr = "something went wrong when saving the msg"
        })
    } else {
        ressErr = "missing data or id error"
    }
    return { ressOk, ressErr }
}

const deleteUser = async (idWs) => {
    const index = await ChatsRoom.findByIdAndDelete(idWs)
    console.log(index);
}
// const getUser = id => {
//     let user = User.find(user => user.id == id)
//     return user
// }


// const getUsers = (nameRoom) => User.filter(user => user.nameRoom === nameRoom)
const disconnect = (socketId) => {
    const UserRooms = ChatsRoom.findOne({ idWs: socketId })
    if (UserRooms) {
        const rooms = UserRooms.Rooms.map(room => room)
        return { nameUser: UserRooms.nameUser }
    }
}

module.exports = { addUser, HomeRoom }
