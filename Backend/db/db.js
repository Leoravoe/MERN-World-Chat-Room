const mongoose = require('mongoose');
require('dotenv').config();



const dbURI = process.env.DB_URI;

mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } )
    .then((res)=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err)
    });

module.exports = mongoose.connection