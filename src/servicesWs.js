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
                ress: UserRoom.Rooms,
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
            ress: "The user is not in any room or not exist",
            WhatHappened: "The user is not in any room or not exist"
        }
        return { ressErr, ressErr }
    }

}

const addUser = async (id, name, nameRoom) => {
    let ressOk = {}
    let ressErr = {}

    const UserName = await User.findOne({ nameUser: name })
    if (UserName === null) {
        ressErr = { ress: { nameRoom, name }, WhatHappened: "user null or room not exist" }
        return { ressOk, ressErr }
    }

    const UserRoom = await ChatsRoom.findOne({ nameUser: name })

    if (UserRoom) {
        const repeatUser = await UserRoom.Rooms.find(room => room.Room === nameRoom)
        if (repeatUser) {
            ressOk = { ress: { nameRoom, name }, WhatHappened: "the user is already in the room" }
        } else if (repeatUser == undefined) {
            UserRoom.Rooms.push({
                Room: nameRoom,
                msj: [],
            })
            try {
                await UserRoom.save()
                ressOk = { ress: { nameRoom, name }, WhatHappened: "new room user good" }
            } catch (error) {
                console.log(error);
                ressErr = { ress: error, WhatHappened: "in new user room error" }
            }
        }
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

    }
}

const SaveMsj = async (socketId, nameUser, nameRoom, message) => {

    const UserRooms = await ChatsRoom.findOne({ nameUser: nameUser })
    let ressOk = {}
    let ressErr = {}
    if (UserRooms == null) {
        ressErr = {
            ress: "user room the not exist",
            WhatHappened: "user room the not exist"
        }
        return { ressOk, ressErr }
    }

    if (UserRooms.idWs == socketId && nameRoom && message) {
        const addmsj = await UserRooms.Rooms.find(room => room.Room == nameRoom)

        try {
            addmsj.msj.push({
                msj: message,
                date: Date
            })
            addmsj.save()
            ressOk = { ress: { UserRooms, message }, WhatHappened: "save msj ok" }
        } catch (error) {
            ressErr = { ress: error, WhatHappened: "something went wrong when saving the msg" }
        }
        return { ressOk, ressErr }
    } else {
        console.log(socketId, nameUser, nameRoom, message);
        ressErr = "missing data or id error"
        return { ressOk, ressErr }
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

module.exports = { addUser, HomeRoom, SaveMsj }
