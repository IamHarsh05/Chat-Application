import "./profile.css";
import Toolbar from "../../Commponents/Toolbar/toolbar";
import Sidebar from "../../Commponents/Sidebar/sidebar";
import Feed from "../../Commponents/Feed/feed";
import Rightbar from "../../Commponents/Rightbar/rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const [user, setUser] = useState({});

  const username = useParams().username ;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      // console.log(res.data);
      setUser(res.data);
    }
    fetchUser();
  },[username]);

  return (
    <>
      < Toolbar/>
      <div className="profile">
        < Sidebar/>
        <div className="profRight">
            <div className="profRTop">
                <div className="profileCover">
                    <img src= {user.coverImg ? PF +"person/"+ user.coverImg : PF+"person/noCover.png"} alt="" className="cover" />
                    <img src={ user.profileImg ? PF +"person/"+ user.profileImg : PF+"person/noAvatar.png"} alt="" className="profileUserImg" />
                </div>
                <div className="profileInfo">
                    <h4 className="profInfoName">{user.username}</h4>
                    <h4 className="profInfoDesc">{user.desc}</h4>
                </div>
            </div>
            <div className="profRBottom">
                < Feed username={username} />
                < Rightbar user={user}/>
            </div>
        </div>
      </div>
    </>
  )
}
