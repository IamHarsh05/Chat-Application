import { useContext,useRef } from "react";
import "./login.css";
import "./back.css";
import {loginCall} from "../../APICalls";
import {AuthContext} from "../../Context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import { useNavigate } from "react-router";

export default function Login() {
    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordagain = useRef();
    const navigate = useNavigate();

    const { user, isFetching, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e)
        loginCall(
            { email: e.target[0].value, 
              password: e.target[1].value },
            dispatch
          );
    };
    console.log(user,"login page");

    const handleClickSignup = async (e) => {
        e.preventDefault();
        if (passwordagain.current.value !== password.current.value) {
            passwordagain.current.setCustomValidity("Passwords don't match!");
        } 
        else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await axios.post("/auth/register", user);
                navigate.push("/login");
            } 
            catch (err) {
                console.log(err);
            }
            // window.location.reload();
        }
    };
  return (
    <>
    <div className="back">
        <ul className="background">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
    <div className="login">
        <div className="loginleft">
            <div className="slider">
                <div className="slide">
                    <img src={PF+ "Ads/ad3.gif"} alt="" className="slid" />
                </div>
            </div>
        </div>
        <div className="loginright">
            <div className="loginWrapper">
                <input type="checkbox" name="check" id="check"  area-hidden = "true"/>
                <div className="loginbox">
                    <form onSubmit={handleClick}>
                        <label htmlFor="check" className="logintitle" aria-hidden="true">Login</label>
                        <div className="loginForm">
                            <input type="email" name="email" className="loginemail" placeholder="Email" ref={email} required/>
                            <input type="password" name="pswd" className="loginpass" placeholder="Password" ref={password} minLength="6" required/>
                            <button className="loginbutton" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress size="23px" />: "Login"}</button>
                            <label htmlFor="forgot" className="forgot">Forgot Password?</label>
                        </div>
                    </form>
                </div>
                <div className="signup">
                    <form onSubmit={handleClickSignup}>
                        <label htmlFor="check" className="signuptitle" aria-hidden="true">Sign Up</label>
                        <div className="signupForm">
                            <input type="text" name="txt" className="signupuser" placeholder="User name" ref={username} required/>
                            <input type="email" className="signupemail" name="email" placeholder="Email" ref={email} required/>
                            <input type="password" className="signuppass" name="pass" placeholder="Password" ref={password} minLength="6" required/>
                            <input type="password" className="signuppass" name="passagain" placeholder="Password Again" ref={passwordagain} minLength="6" required/>
                            <button className="signupbutton" type="submit">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>      
        </div>
    </div>
    </>
  )
}
