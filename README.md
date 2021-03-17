# World Chat Room (MERN stack)

## Introduction

> It is a real time chat room with minimal UI/UX and without  authentication. The Web RTC (Real Time Communication) done with Pusher to make MongoDB real time. 

> Feel free to contribute on this project and improve the performance of the code.

## Code Samples

#### The real time communication with Pusher Code sample 

####  Front-end 

      const pusher = new Pusher(process.env.REACT_APP_PUSHERID, {
            cluster: 'mt1'
      });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage]);
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe('messages');
    }

####  Back-end 

    const Pusher = require("pusher");

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

## Installation

> Fork and clone the repository the than in terminal run "npm i" in backend and worldchat portal to install all the dependencies 

> Read the Pusher documentation to get the values

> Now create .".env" file in the root directory of both the file 

> For front-end the ".env" file contain 

> REACT_APP_PUSHERID = " Pusher ID"

>For back-end the ".env" file contain

>DB_URI= "MongoDB URI here"

> PORT = 8080 || or desirable port number

>PUSHERAPPID = " Pusher App ID"

>PUSHERKEY = " Pusher Key"

>PUSHERSECRET = " Pusher Secret Number "

