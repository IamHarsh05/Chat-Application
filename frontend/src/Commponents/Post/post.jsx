import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
 
export default function Post({post}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    const [like, setlike] = useState(post.likes.length);
    const [islike, setislike] = useState(false);

    const [user, setUsers] = useState({});

    const {user:currentuser} = useContext(AuthContext);

    useEffect(() => {
        setislike(post.likes.includes(currentuser._id));
    }, [currentuser._id,post.likes])
    
    useEffect(() => {
        const fetchUsers = async () => {
          const res = await axios.get(`/users?userId=${post.userId}`);
          setUsers(res.data)
        }
        fetchUsers();
    },[post.userId]);

    const likeHandler = () => {
        try{
            axios.put("/post/"+post._id+"/like",{userId:currentuser._id})
        }
        catch(err) {}
        setlike(islike ? like - 1: like + 1);
        setislike(!islike);
    };

    return (
    <div className="post">
        <div className="postwrapper">
            <div className="posttop">
                <div className="topleft">
                    <Link to={`/profile/${user.username}`}>
                        <img className="postprofImg" src={user.profileImg ? PF + "person/"+ user.profileImg : PF+"person/noAvatar.png"} alt="" />
                    </Link>
                    <span className="postusername">{user.username}</span>
                    <span className="postdate">{format(post.createdAt)}</span>
                </div>
                <div className="topright">
                    < MoreVertIcon/>
                </div>
            </div>
            <div className="postcenter">
                <span className="posttext">{post?.desc}</span>
                <img className="postimg" src= {PF+post.img} alt="" />
            </div>
            <div className="postend">
                <div className="bottomleft">
                    < FavoriteBorderIcon className="like" onClick ={likeHandler} />
                    < ThumbUpOffAltIcon className="thumb" onClick ={likeHandler} />
                    <span className="likecounter">{like} people liked</span>
                </div>
                <div className="bottomright">
                    <span className="comment">{post.comment} person has commented</span>
                </div>
            </div>
        </div>
    </div>
  )
}

