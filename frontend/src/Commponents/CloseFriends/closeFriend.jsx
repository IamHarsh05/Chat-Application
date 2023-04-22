import "./closeFriend.css";
import { Link } from "react-router-dom";

export default function closeFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Link to = {"/profile/"+user.username} style={{textDecoration:"none", color:"black"}}>
    <li className="friend">
            <img src={user.profileImg ? PF + "person/"+ user.profileImg : PF+"person/noAvatar.png"} alt="Profile_Picture" className="friendimg" />
            <span className="friendname">{user.username}</span>
    </li>
    </Link>
  )
}
