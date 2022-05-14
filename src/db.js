const mongoose = require("mongoose")
const connectionString = process.env.DB  
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
