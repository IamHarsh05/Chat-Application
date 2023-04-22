export default function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rbFr">
        <div className="rProfImg">
            <img src= {user.profileImg ? PF + "person/" + user.profileImg : PF+"person/noAvatar.png"} alt="" className="proImg" />
            <span className="rbOnline"></span>
        </div>
        <span className="rbProfName">{user.username}</span>
    </li>
  )
}
