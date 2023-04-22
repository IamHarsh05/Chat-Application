import "./share.css"
import MmsOutlinedIcon from '@mui/icons-material/MmsOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const {user} = useContext(AuthContext);
  const desc = useRef();
  const [file,setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc : desc.current.value 
    }
    if(file){
      const data = new FormData();
      const filename =  file.name;
      data.append("file", file);
      data.append("name",filename);
      newPost.img = filename;
      // console.log(filename);
      try{
        await axios.post("/upload", data);
      }
      catch(err){
        console.log(err);
      }
    }
    try{
      await axios.post("/post",newPost)
      window.location.reload();
    }
    catch(err){
      console.log(err)
    }
  }
  // console.log(PF + "person/"+ currentuser.profileImg);
  return (
    <div className="share">
      <div className="sharewrapper">
        <div className="top">
            <img src={user.profileImg ? PF + "person/"+ user.profileImg : PF+"person/noAvatar.png"} alt="Profile_picture" className="shareprofImg" />
            <input type="text" placeholder={"Hello " + user.username + " You can type here..."} className="shareio" ref={desc} />
        </div>
        <hr className="sharedivider" />
        {file && (
          <div className="shareImgContaine">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CancelIcon className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="bottom" onSubmit={submitHandler}>
            <div className="shareoptions">
                <label htmlFor="file" className="shareoption">
                    < MmsOutlinedIcon className="icon1"/>
                    <span>Photo / Video</span>
                    <input type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} />
                </label>
                <div className="shareoption">
                    < LocalOfferIcon className="icon2"/>
                    <span>Tags</span>
                </div>
                <div className="shareoption">
                    < LocationOnIcon className="icon3"/>
                    <span>Location</span>
                </div>
                <div className="shareoption">
                    < EmojiEmotionsIcon className="icon4"/>
                    <span>Status</span>
                </div>
            </div>
            <button className="sharebut" type="submit">< SendIcon className="shareicon"/></button>
        </form>
      </div>
    </div>
  )
}
