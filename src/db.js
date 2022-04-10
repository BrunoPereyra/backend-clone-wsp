const mongoose = require("mongoose")
const connectionString = process.env.DB  || "mongodb+srv://brunowhatsapp:W9r307vmgySGfC6V@cluster0.kaqre.mongodb.net/clone-whatsapp?retryWrites=true&w=majority"
require("colors")

mongoose.connect(connectionString,
    {
        // useNewUrlParser: false,
        // useUnifiedTopology: false,
        // useFindAndModify: false,
        // useCreateIndex: false
    })
    .then(()=>{
        console.log("db connect".bgWhite.black);
    })
    .catch((err)=>{
        console.log(err)
    })
