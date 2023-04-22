import "./rightbar.css";
import Online from "../Online/online";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import ChatIcon from '@mui/icons-material/Chat';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

export default function Rightbar({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const [friends, setFriends] = useState([]);
  
  // const [createConv, setCreateConv] = useState([]);

  const {user:currentuser, dispatch} = useContext(AuthContext);

  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentuser.followings.includes(user?._id));
  },[currentuser,user]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user?._id);
        setFriends(friendList.data);
      } 
      catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  useEffect(() => {
    const getHomeFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + currentuser?._id);
        setFriends(friendList.data);
      } 
      catch (err) {
        console.log(err);
      }
    };
    getHomeFriends();
  }, [currentuser]);

  const handleclick = async () => {
    try {
      if (followed) {
        await axios.put("/users/"+ user._id +"/unfollow", {
          userId: currentuser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } 
      else {
        await axios.put("/users/"+user._id+"/follow", {
          userId: currentuser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } 
    catch (err) {
      console.log(err);
    }
  };

  const createChat = async () =>{
    try{
      await axios.post("/conversations/",{
        senderId: currentuser._id,
        recevierId: user._id
      })
    }
    catch (err) {
      console.log(err)
    }
  };



  const HomeRightBar = () => {
    return(
      <>
      <div className="birthday">
          <img src={`${PF}other/gift.png`} alt="" className="birth" />
          <span className="btext"> <b>Harshy</b> and  <b>3 other</b> friends have borthday today</span>
        </div>
        <div className="ad">
          <img src={`${PF}Ads/ad3.gif`} alt="" className="ads" />
        </div>
        <h4 className="title">Online Friends</h4>
        <ul className="flist">
          {friends.map((u,i) => (
            <Link key={i} to = {"/profile/"+u.username} style={{textDecoration:"none", color:"black"}}>
              < Online key={u.id} user = {u} />
            </Link>
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    return(
      <>
      <div className="buttonsss">
          {user.username !== currentuser.username && (<>
            <button className="rbfollowbut" onClick={handleclick}>
              {followed ? <><PersonRemoveIcon/><span className="fltext"> Unfollow</span></> : <><PersonAddIcon/> <span className="fltext"> Follow</span></>}
            </button>
            <button className="chatbut" onClick={createChat}>
              <span> Chat </span>< ChatIcon className="chaticon"/>
            </button></>
          )}
        </div>
        <h1 className="RightBarTitle">Information</h1>
        <div className="infocontainer">
          <div className="rightbarinfoitme">
            <span className="infoKey">City:</span>
            <span className="infoValue">{user.city}</span>
          </div>
          <div className="rightbarinfoitme">
            <span className="infoKey">From:</span>
            <span className="infoValue">{user.from}</span>
          </div>
          <div className="rightbarinfoitme">
            <span className="infoKey">Status:</span>
            <span className="infoValue">{user.relationship === 1 ? "Single"
                                        :user.relationship === 2 ? "Married"
                                        : "-" }</span>
          </div>
          <h4 className="friends">Friends</h4>
          <div className="followings">
            {friends.map((friend,i)=>(
              <Link key={i} to={"/profile/"+friend.username} style={{textDecoration:"none", color:"black"}}>
                <div className="follow">
                  <img src={friend.profileImg ? PF + "person/" + friend.profileImg : PF+"person/noAvatar.png"} alt="" className="followingIMG" />
                  <span className="followingUserName">{friend.username}</span>
                </div>              
              </Link>
              ))}
          </div>
        </div>
      </>
    )
  };

  return (
    <div className="rightbar">
      <div className="rightbarwrapper">
        { user ? < ProfileRightBar/> : < HomeRightBar/>}
      </div> 
    </div>
  )
}
