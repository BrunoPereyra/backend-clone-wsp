const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
require("./db")
const useExtractor = require("./middlewares/useExtractor")
const http = require("http")

const server = http.createServer(app)
const io = require("socket.io")(server,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
})

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.use("/home",useExtractor,require("./routes/home.routes"))
app.use("/signup",require("./routes/signup.routes"))
app.use("/login",require("./routes/login.routes"))
app.use("/chats",useExtractor,require("./routes/chats.routes"))

app.use(require("./middlewares/notFound"))

const PORT = process.env.PORT || 3000
server.listen(PORT,()=>{
    console.log(`port listen on ${PORT}`.bgWhite.black);
})

