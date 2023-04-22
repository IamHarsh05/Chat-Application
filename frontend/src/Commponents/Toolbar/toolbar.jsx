import "./toolbar.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function Toolbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const {user: currentuser} = useContext(AuthContext);

  return (
    <div className="Top-bar">
        <div className="topbarLeft">
          <Link to="/" style={{textDecoration: "none"}} >
            <span className="logo">Chat Book</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <label htmlFor="search">< SearchIcon className="SearchIcon"/></label>
            <input type="text" id="search" className="search" placeholder="You can Search Here!" />
          </div>
        </div>
        <div className="topbarRight">
          <div className="links">
            <Link to = {"/"}  style={{textDecoration: "none",color:"white"}} >
              <span className="link">Home</span>
            </Link>
            <Link to = {`/profile/${currentuser.username}`} style={{textDecoration: "none",color:"white"}} >
              <span className="link">My Post</span>
            </Link>
          </div>
          <div className="icons">
          <div className="icon">
              <PersonIcon/>
              <span className="badge">1</span>
             </div> 
              <Link to = {"/messenger"}  style={{textDecoration: "none",color:"white"}}>
                <div className="icon">
                  <ChatIcon/>
                  <span className="badge">1</span>
                </div> 
              </Link>
             <div className="icon">
              <NotificationsIcon/>
              <span className="badge">1</span>
             </div> 
          </div>
          <Link to = {`/profile/${currentuser.username}`}>
            <img src={currentuser.profileImg ? PF + "person/"+ currentuser.profileImg : PF+"person/noAvatar.png"} alt="Profile_Picture" className="profile-pic" />
          </Link>
        </div>
    </div>
  )
}
