const { addUser, HomeRoom } = require('./servicesWs')

const socket = (io) => {

    io.on('connection', (socket) => {

        socket.on("HomeRooms", async ({ name }) => {
            const { ressOk, ressErr } = await HomeRoom(name, socket.id)

            if (ressErr.ress) {
                io.in(socket.id).emit("notificationError", { ressErr })
            } else if (ressOk.ress) {
                console.log(ressOk.ress.Rooms, "aa");
                // socket.join(ressOk.ress)
            }

        })

        socket.on('AddRoom', async ({ name, nameRoom }) => {
            const { ressOk, ressErr } = await addUser(socket.id, name, nameRoom)

            if (ressErr.ress = "user null") {
                // console.log(ressErr.ress, "error")
                io.in(socket.id).emit("notificationError", { ressErr })

            } else if (ressOk.ress.nameRoom == nameRoom) {
                socket.join(ressOk.ress.nameRoom)
                socket.in(ressOk.ress.nameRoom).emit('notification',
                    {
                        title: 'Someone\'s here',
                        description: `${ressOk.ress.name} just entered the room`

                    })

            } else if (ressOk.ress.id == socket.id) {
                socket.join(ressOk.ress.nameRoom)
                socket.in(ressOk.ress.nameRoom).emit('notification',
                    {
                        title: 'Someone\'s here',
                        description: `${ressOk.ress.name} just entered the room the new,change id`

                    })
            }
        })


        socket.on('sendMessage', async ({ message, nameUser, nameRoom }) => {
            message.toString()
            if (message && nameUser && nameRoom) {
                // const save = await SaveMsj(socket.id,nameUser,nameRoom,message)
                // if(save){}
                io.in(nameRoom).emit('message', { nameUser: user.name, text: message });
            } else {
                // io.in(socket.id).emit("notificationError", { ressErr })
                console.log("missing data");
            }
        })

        socket.on("disconnect", () => {
            // const { nameUser } = disconnect(socket.id)
            // if (nameUser) {
            //     io.emit
            // }

        })

    })
}
module.exports = socket