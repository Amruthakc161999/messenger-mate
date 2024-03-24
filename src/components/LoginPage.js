import React from 'react';
import {signInWithPopup} from "firebase/auth";
import {loginDetails,GoogleProvider} from "../firebase-config-setting";
import Cookies from "universal-cookie";
import "../styles/LoginPage.css";

const cookies = new Cookies();

export const LoginPage = (props) => {
    const {setUserLoggedIn} = props;
    const signIn = async()=>{
        try{
        const data = await signInWithPopup(loginDetails,GoogleProvider);
        console.log(data)
        cookies.set("access_token",data.user.refreshToken);
        setUserLoggedIn(true);
        }
        catch(err){
            console.error(err);
        }
    }
  return (
    <div className="auth">
        <div className="login-header">
        <h1>Welcome to Messenger Mate</h1>
        <p>Sign In With Google Account to Continue</p>
        <button onClick={signIn} className="sign-in">
            Sign In
        </button>
        </div>
    </div>
  )
}


