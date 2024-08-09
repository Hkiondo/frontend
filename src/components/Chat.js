import React, {useEffect, useState, useRef} from "react";
import socketIOClient from 'socket.io-client';

const Chat =() =>{
    const [messages, setMessages] =useState([]);
    const [input, setInput] = useState('');
    const socketRef =useRef(); 

    useEffect(() =>{
        socketRef.current =  socketIOClient('http://localhost:5000');
        socketRef.current.on('message', message =>{
            setMessages(prevmessages =>[...prevmessages, message]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = () => {
        socketRef.current.emit('message', input);
        setInput('');
    };

    return (
        <div className="container">
            <h1>Chat</h1>
            <div>
                {messages.map((msg, index) => <p key={index}>{msg}</p>)}
            </div>
            <input value={input} onChange={e => setInput(e.target.value)}/>
            <button onClick={sendMessage}>Send</button>
        </div>
    );

};
export default Chat;