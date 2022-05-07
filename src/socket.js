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

            if (
                ressErr.WhatHappened == (
                    "user null or room not exist" ||
                    "in new user room error" ||
                    "in add new user room error")

            ) {
                io.in(socket.id).emit("notificationError", { ressErr })

            }

            console.log(ressOk, "ressOk yeeea")
            if (ressOk.WhatHappened == "add new user room goood") {
                socket.join(ressOk.ress.nameRoom)
                socket.in(ressOk.ress.nameRoom).emit('notification',
                    {
                        title: 'Someone\'s here',
                        description: `${ressOk.ress.name} just entered the room`

                    })
            } else if (ressOk.WhatHappened == "new room user good") {
                socket.join(ressOk.ress.nameRoom)
                socket.in(ressOk.ress.nameRoom).emit('notification',
                    {
                        title: 'Someone\'s here',
                        description: `${ressOk.ress.name} just entered the room`

                    })
            } else if (ressOk.WhatHappened == "add new user room goood") {
                socket.join(ressOk.ress.nameRoom)
                socket.in(ressOk.ress.nameRoom).emit('notification',
                    {
                        title: 'Someone\'s here',
                        description: `${ressOk.ress.name} just entered the room`

                    })
            } else if (ressOk.WhatHappened == "the user is already in the room") {
                io.in(socket.id).emit("notification", { ressOk })
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