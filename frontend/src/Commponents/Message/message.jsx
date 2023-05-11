import "./message.css";
import { format } from "timeago.js";

export default function Message({message, own,profPic}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(own.username)
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messTop">
        <img src={profPic.profileImg ? PF + "person/"+ profPic.profileImg : PF+"person/noAvatar.png"} alt="" className="messImg" />
        <span className="messText">{message.text}</span>
      </div>
      <div className="messBottom">
        <span className="messTime">{format(message.createdAt)}</span>
      </div>
    </div>
  )
}
