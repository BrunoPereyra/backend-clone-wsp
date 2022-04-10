const Chats = require("../models/Chats")
const User = require("../models/User")


const chats = async (req, res) => {
    const { message, forTheUser } = req.body
    const { idUser } = req
    const user = await User.findById(idUser)
    if (!user || messsge !== String) {
        res.status(404).send("not found")
    }
    let nameUser = user.nameUser
    const chat = await Chats.findOne({nameUser})
    if(chat){
        chat.message.push()
    }


}
module.exports = chats