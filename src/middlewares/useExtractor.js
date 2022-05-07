const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    const authorization = req.get('authorization')
    let token = ""
    
    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
        token = authorization.substring(7)
    }
    const decodetoken = jwt.verify(token,"123")
    if (!token || !decodetoken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
  
    req.idUser = decodetoken.id
    next()

}