// imports
const express = require('express');
const cors = require('cors');
const Pusher = require("pusher");
const db = require('./db/db')
require('./db/db')
require('dotenv').config();

// app config

const app = express();

const pusher = new Pusher({
    appId: process.env.PUSHERAPPID,
    key: process.env.PUSHERKEY,
    secret: process.env.PUSHERSECRET,
    cluster: "mt1",
    useTLS: true
});

// db config

db.once('open',()=>{
    
    const messageCollection = db.collection('chats');
    const changeStream = messageCollection.watch();
    
    changeStream.on('change', (change)=>{
        // console.log(change);

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                chats : messageDetails.chats,
                received : messageDetails.received
            });
        }else{
            console.log("There was a problem triggering pusher")
        }
    })
})

// middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// port config
PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`App listening to port ${PORT}`);
});


// routes
app.get('/',(req, res)=>{
    res.send("Hello I am on !!")
})

app.use('/message', require('./routes/chatRoutes'));

