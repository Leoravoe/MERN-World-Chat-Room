import React, {useEffect, useState} from 'react';
import Pusher from 'pusher-js'
import './App.css';
import Chatsection from './Chatsection';
import axios from './axios';

function App() {
  
  const [messages, setMessages] = useState([]);

  useEffect(() =>{
    axios.get('/chats/messages')
      .then(res => {
        // console.log(res.data);
        setMessages(res.data);
      })
  },[]);


  useEffect(() =>{
    const pusher = new Pusher(process.env.REACT_APP_PUSHERID, {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage]);
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe('messages');
    }




  },[messages])
  console.log(messages)
  return (
    <div className="app">
      {/* <h1>My whatsapp clone</h1> */}
      <div className="app-body">
        {/* Chat component */}
        <Chatsection messages={messages}/>
      </div>
    </div>
  );
}

export default App;
