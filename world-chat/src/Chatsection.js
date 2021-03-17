import React, {useState, useEffect} from 'react';
import axios from './axios';



const Chatsection = ({messages}) => {
    
    const [input, setInput] = useState("");
    
    const sendMessage = async e =>{
        e.preventDefault();

        await axios.post('/chats',{
            name: "Preetam",
            chats : input,
            received : false
        })

        setInput('');
    }
    return (
        <div className="chatBody">
        {/* <div>I am chat Section</div> */}
        <div className="messageBody">
            { messages.map(message =>(
                <p className={`chat-message ${!message.received && "chat-receiver"}`}>
                <span className="chatName">
                    {message.name}
                </span>
                {message.chats}
            </p>
            ))
                
            }
            {/* <p className="chat-message">
                <span className="chatName">
                    Preetam
                </span>
                This is my message.
            </p> */}

            
        </div>
        <div className="chat-footer">
            <form>
            <input 
                type="text" 
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder = "Type message"
            />
            <button
                onClick={sendMessage}
                type="submit"
            >
                Send
            </button>
            </form>
        </div>
        </div>
    );
}


export default Chatsection;