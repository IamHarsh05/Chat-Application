import "./message.css";
import { format } from "timeago.js";

export default function Message({message, own}) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messTop">
        <img src="Assest/post/8.jpeg" alt="" className="messImg" />
        <span className="messText">{message.text}</span>
      </div>
      <div className="messBottom">
        <span className="messTime">{format(message.createdAt)}</span>
      </div>
    </div>
  )
}
