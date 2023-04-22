import "./messenger.css";
import Toolbar from "../../Commponents/Toolbar/toolbar";
import Conversation from "../../Commponents/Conversation/conversation";
import Message from "../../Commponents/Message/message";
import Chatonline from "../../Commponents/ChatOnline/chatonline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import {io} from "socket.io-client";

export default function Messenger() {

    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newmessage, setNewmessage] = useState("");
    const [arrivalmessage, setArrivalmessage] = useState(null);
    const {user} = useContext(AuthContext)
    const scrollRef = useRef();
    const socket = useRef()

    useEffect(()=>{
        socket.current = io("ws://localhost:8900");        
        socket.current.on("getMessage",data=>{
            setArrivalmessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })      
        })
    },[])

    useEffect(()=>{
        arrivalmessage && currentChat?.members.includes(arrivalmessage.sender) &&
        setMessages((prev) => [...prev,arrivalmessage]);
    },[arrivalmessage, currentChat])

    useEffect(()=>{
        socket?.current.emit("addUser", user._id);
        socket.current.on("getUser", users => {
            console.log(users)
        });
    },[user])

    // console.log(socket)

    useEffect(()=>{
        const getConversation = async () => {
            try{
                const res = await axios.get("/conversations/"+ user._id)
                setConversation(res.data);
            }
            catch(err){
                console.log(err)
            }
        }
        getConversation();
    },[user._id]);
    
    useEffect(()=>{
        const getMessage = async () => {
            try{
                const res = await axios.get("/message/"+ currentChat?._id);
                setMessages(res.data);
            }
            catch(err){
                console.log(err)
            }
        };
        getMessage();
    },[currentChat]);
    // console.log(messages);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender : user._id,
            text : newmessage,
            conversationId : currentChat._id,
        };

        const receiverId = currentChat.members.find(member => member !== user._id);

        socket.current.emit("sendMessage",{
            senderId : user._id,
            receiverId,
            text: newmessage,
        });
        try{
            const res = await axios.post("/message",message);
            setMessages([...messages, res.data]);
            setNewmessage("");
        }
        catch(err){
            console.log(err);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior : "smooth"});
    })
  return (
    <>
        <Toolbar/>
        <div className="messenger">
            <div className="menu">
                <div className="menuwrapper">
                    <input type="text" placeholder="Search Friends" className="menuin" />
                    {conversation.map((c,i)=>(
                        <div key={i} onClick={() => setCurrentChat(c)}>
                            <Conversation conversation={c} currentUser={user}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatbox">
                <div className="boxwrapper">
                    {
                        currentChat ?
                    <>
                    <div className="chattop">
                        {messages.map((m,i) => (
                            <div key={i} ref={scrollRef}>
                                < Message message={m} own={m.sender === user._id}/>
                            </div>
                        ))}
                    </div>
                    <div className="chatbottom">
                        <textarea name="chatMess" placeholder="type here..." className="chatMessIn" id="" onChange={(e) => setNewmessage(e.target.value)} value={newmessage}></textarea>
                        <button className="sendButton" onClick={handleSubmit} >Send</button>
                    </div> 
                    </> : <span className="noConv">Open A Conversation To Chat </span> }
                </div>
            </div>
            <div className="chatonline">
                <div className="onlinewrapper">
                    < Chatonline/>
                </div>
            </div>
        </div>            
    </>
  )
}
