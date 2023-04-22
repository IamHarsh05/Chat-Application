import { useContext } from "react";
import Home from "./Pages/Home/home";
import Login from "./Pages/Login/login";
import Profile from "./Pages/Profile/profile";
import Messenger from "./Pages/Messenger/messenger";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { AuthContext } from "./Context/AuthContext";

function App() {
  const {user} = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login/>} />
        <Route path="/login" element={user ? < Navigate replace to="/"/> : <Login />} />
        <Route path="/messenger" element={!user ? < Navigate replace to="/"/> : <Messenger />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
