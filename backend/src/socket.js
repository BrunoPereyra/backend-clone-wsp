const { addUser } = require('./servicesWs')

const socket = (io) => {

    io.on('connection', (socket) => {
        socket.on('RoomAccess', ({ name, nameRoom }) => {
            const {returnsok,errors} = addUser(socket.id, name, nameRoom)
            console.log(returnsok, "ok");
            console.log(errors,"okn`t");
            // socket.join(nameUserRoom.nameRoom)
            // socket.in(nameRoom).emit('notification', { title: 'Someone\'s here', description: `${User.nameUser} just entered the room` })
            // io.in(nameRoom).emit('users', getUsers(nameRoom))
        })
        socket.on('sendMessage', async ({message,nameUser,nameRoom}) => {
            message.toString()
            if (message && nameUser && nameRoom) {
                // const save = await SaveMsj(socket.id,nameUser,nameRoom,message)
                // if(save){}
                io.in(nameRoom).emit('message', {nameUser: user.name, text: message });
            }
        })

        socket.on("disconnect", () => {

        })

    })
}
module.exports = socket