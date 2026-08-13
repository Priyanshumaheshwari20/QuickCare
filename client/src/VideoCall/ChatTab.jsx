import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import "./ChatTab.css";

function ChatTab() {

const [message,setMessage] = useState("");
const sendMessage = () => {

if(!message.trim()) return;
// socket.io se later send hoga

setMessage("");

};


return (

<div className="chat-container">
 <div className="chat-header">

        <h3>
            Live Chat
        </h3>

        <p>
            Messages disappear after call
        </p>

    </div>


  <div className="chat-messages">
<div className="chat-empty">

            <p>
                No messages yet
            </p>

            <span>
                Start conversation during consultation
            </span>

        </div>


    </div>



    <div className="chat-input">


        <input

            type="text"

            placeholder="Type message..."

            value={message}

            onChange={(e)=>setMessage(e.target.value)}

        />


        <button onClick={sendMessage}>

            <FaPaperPlane />

        </button>


    </div>


</div>

);

}

export default ChatTab;