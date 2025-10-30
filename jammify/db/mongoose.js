/* In this file, we establish a connection to our mongo server. 
This file gets imported by server.js to actually send/retrieve data */

const mongoose = require('mongoose')

// this "||" (or) is here to handle both cases for when
// 1) this is being hosted/deployed
// 2) when we're hosting it locally (mongo db is usually port 27017)
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Jammify'

// establish the connection
mongoose.connect(mongoURI,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true
    }).then(() => {
        console.log("mongoose.js: Connection to database successful!")
    })
    .catch((error) => {
        console.log(error)
        console.log('mongoose.js: Got an error trying to connect to mongodb.')
    });

// export the connection (to be used in server.js)
module.exports = { mongoose }