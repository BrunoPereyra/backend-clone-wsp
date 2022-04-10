const User = require("../models/User")
const bcrypt = require("bcrypt")

const signup = async (req, res) => {
    const { name, password, gmail,nameUser } =  req.body

    if (!name || !nameUser || !password || !gmail) {
        res.status(400).send("missing data")
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const newuser = new User({
        name,
        passwordHash,
        nameUser,
        gmail
    })
    const repeatUser = await User.findOne({ nameUser })
    if (repeatUser) {
        res.status(401).json({
            error: "nameUser repeat"
        })
    } else {
        newuser.save().then(() => {
            res.status(201).send("ok")
        }).catch((err) => next(err))
    }

}
module.exports = signup