const { addUser, HomeRoom, SaveMsj } = require('./servicesWs')

const socket = (io) => {

    io.on('connection', (socket) => {

        socket.on("HomeRooms", async ({ name }) => {
            const { ressOk, ressErr } = await HomeRoom(name, socket.id)
            if (ressErr.ress) {
                io.in(socket.id).emit("notificationError", { ressErr })
            } else if (ressOk.ress) {
                io.in(socket.id).emit("notificationError", { ressOk })
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

            if (ressOk.WhatHappened == "add new user room goood") {
                socket.in(ressOk.ress.nameRoom).emit('notification',
                    {
                        title: 'Someone\'s here',
                        description: `${ressOk.ress.name} just entered the room`

                    })
            } else if (ressOk.WhatHappened == "new room user good") {
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

            const { ressOk, ressErr } = await SaveMsj(socket.id, nameUser, nameRoom, message)

            if (message && nameUser && nameRoom) {
                if (ressErr.WhatHappened ==
                    "user room the not exist" ||
                    "something went wrong when saving the msg" ||
                    "missing data or id error"
                ) {
                    io.in(socket.id).emit("notificationError", { ressErr })
                } else if (ressOk.WhatHappened == "save msj ok") {
                    console.log("aaa");
                    socket.join(nameRoom)
                    io.in(nameRoom).emit('message', { nameUser, nameRoom, text: message });
                }

            } else {
                io.in(socket.id).emit("notificationError", { ressErr })
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