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
                msjRoom: [],
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
                    msjRoom: [],
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

    if (UserRooms.idWs === socketId && nameRoom && message) {

        try {

            const RoomAddMsj = await ChatsRoom.findOne({ idWs: socketId })
            let addmsjChatsRoom = await RoomAddMsj.Rooms

            for (let i = 0; i < addmsjChatsRoom.length; i++) {
                const room = addmsjChatsRoom[i];
                if (room.Room == nameRoom) {
                    await addmsjChatsRoom[i].msjRoom.push({
                        msj: message,
                        date: Date()
                    })
                    RoomAddMsj.Rooms[i] = await room
                    await RoomAddMsj.save()
                }
            }
        } catch (error) {

            console.log(error);
            ressOk = { ress: { UserRooms, message }, WhatHappened: "save msj ok" }
            ressErr = { ress: error, WhatHappened: "something went wrong when saving the msg" }
        }
        return { ressOk, ressErr }
    } else {
        ressErr = "missing data or id error"
        return { ressOk, ressErr }
    }
    return { ressOk, ressErr }
}

const deleteUser = async (idWs) => {
    const index = await ChatsRoom.findByIdAndDelete(idWs)
    console.log(index);
}

const disconnect = (socketId) => {
    const UserRooms = ChatsRoom.findOne({ idWs: socketId })
    if (UserRooms) {
        const rooms = UserRooms.Rooms.map(room => room)
        return { nameUser: UserRooms.nameUser }
    }
}

module.exports = { addUser, HomeRoom, SaveMsj }
