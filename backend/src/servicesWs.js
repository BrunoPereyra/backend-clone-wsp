const ChatsRoom = require("./models/chatsRoom")
const User = require("./models/user")

const addUser = async (id, name, nameRoom) => {

    const UserName = await User.findOne({ nameUser: name })
    const UserRoom = await ChatsRoom.findOne({ nameUser: name })
    let returnsok
    let errors

    if (UserName) {
        if (UserRoom == null) {
            const chatNewConnect = new ChatsRoom({
                Rooms: [{
                    nameRoom: nameRoom,
                    msj: [],
                }],
                idWs: id,
                nameUser: name
            })

            chatNewConnect.save().then(() => {
                returnsok = "add new user room goood"
            }).catch(() => {
                errors = "in add new user room error"
            })

        } else if (UserRoom) {
            UserRoom.idWs = id
            await UserRoom.save().then(() => {
                returnsok = "new id user good"
            }).catch(() => {
                errors = "new id user error"
            })
        }
        return { returnsok, errors }
    } else if (!name || !nameRoom) {
        errors = "Username and nameRoom are required or not exist"
        return { returnsok, errors }
    }
}

const SaveMsj = async (socketId, nameUser, nameRoom, message) => {

    const UserName = await User.findOne({ nameUser: nameUser })
    let returnsok
    let errors

    if (UserName.idWs == socketId && nameRoom) {
        const addmsj = await UserName.Rooms.find(room => room.nameRoom == nameRoom)
        addmsj.msj.push({
            msj: message,
            date: Date
        })
        addmsj.save().then(() => {
            returnsok = "save msj ok"
        }).catch(() => {
            errors = "something went wrong when saving the msg"
        })
    } else {
        errors = "missing data or id error"
    }
    return { returnsok, errors }
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

module.exports = { addUser }
