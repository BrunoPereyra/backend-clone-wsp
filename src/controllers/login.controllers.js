const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const login = async (req, res) => {
    const { nameUser, password } = req.body

    const user = await User.findOne({ nameUser})
    const passwordCorrect = user == null
        ? null
        : await bcrypt.compare(password, user.passwordHash)

    if ((passwordCorrect || user) == null) {
        res.status(401).json({
            res: "password o nameUser incorrect"
        })
    }
    const userForToken = {
        id: user.id,
        nameUser: user.nameUser
    }
    const token = jwt.sign(
        userForToken,
        "123",
        {
            expiresIn: 60 * 60 * 24 * 7
        }
    )
    res.json({
        token
    })

}
module.exports = login