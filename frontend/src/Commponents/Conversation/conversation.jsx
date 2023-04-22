import { useEffect, useState } from "react";
import "./conversation.css";
import axios from "axios";

export default function Conversation({conversation, currentUser}) {
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    
    const getUser = async () => {
      try{
        const res = await axios("/users?userId=" + friendId)
        // console.log(res)
        setUser(res.data);
      }
      catch (err){
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation])
  // console.log(user.email);

  return (
    <div className="conversation">
      <img src= {user?.profileImg ? PF + "person/"+ user.profileImg : PF+"person/noAvatar.png"} alt="" className="conImg" />
      <span className="conName">{user?.username}</span>
    </div>
  )
}
