import "./sidebar.css";
import MmsOutlinedIcon from '@mui/icons-material/MmsOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import CloseFriend from "../CloseFriends/closeFriend";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

export default function Sidebar() {
    const {user} = useContext(AuthContext);
    const [allUsers,setAllUsers] = useState([])


    useEffect(() => {
        const getAllUsers = async () => {
          try {
            const userList = await axios.get("/users/all");
            setAllUsers(userList.data);
          } catch (err) 
          {
            console.log(err);
          }
        };
        getAllUsers();
      }, []);

    console.log(user)

  return (
    <div className="sidebar">
      <div className="wrapper">
        <ul className="list">
            <li className="item">
                < MmsOutlinedIcon/>
                <span className="itemtext">Feed</span>
            </li>
            <li className="item">
                < ChatOutlinedIcon/>
                <span className="itemtext">Chats</span>
            </li>
            <li className="item">
                < PlayCircleOutlinedIcon/>
                <span className="itemtext">Reels</span>
            </li>
            <li className="item">
                < PeopleAltOutlinedIcon/>
                <span className="itemtext">Groups</span>
            </li>
            <li className="item">
                < BookmarkBorderOutlinedIcon/>
                <span className="itemtext">Bookmarks</span>
            </li>
            <li className="item">
                < ContactSupportOutlinedIcon/>
                <span className="itemtext">Ask Me</span>
            </li>
            <li className="item">
                < WorkHistoryOutlinedIcon/>
                <span className="itemtext">Activity</span>
            </li>
            <li className="item">
                < EditCalendarOutlinedIcon/>
                <span className="itemtext">Events</span>
            </li>
            <li className="item">
                < PublicOutlinedIcon/>
                <span className="itemtext">Web</span>
            </li>
        </ul>
        <button className="show">Show More</button>
        <hr className="divider"/>
        <ul className="friendlist">
            {allUsers.map((u,i) => (
                < CloseFriend key={u.id} user={u} />
            ))}
        </ul>
      </div>
    </div>
  )
}
