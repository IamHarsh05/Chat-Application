import Toolbar from "../../Commponents/Toolbar/toolbar";
import Sidebar from "../../Commponents/Sidebar/sidebar";
import Feed from "../../Commponents/Feed/feed";
import Rightbar from "../../Commponents/Rightbar/rightbar";
import "./home.css";

export default function home() {
  return (
    <>
      < Toolbar/>
      <div className="container">
        < Sidebar/>
        < Feed/>
        < Rightbar/>
      </div>
    </>
  )
}
