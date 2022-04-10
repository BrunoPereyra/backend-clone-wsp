const User = require("../models/User")

const home = async (req, res) => {

    const { idUser } = req
    const user = await User.findById( idUser )
    if (user) {
        const contacts = user.contacts
        res.status(201).json({
            user: user.name,
            nameUser: user.nameUser,
            userphotoUrl: user.photoUrl,
            contacts,
        })
    } else {
        res.status(404).send("the user not found")
    }
}
module.exports = home