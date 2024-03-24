import { loginDetails } from "../firebase-config-setting.js";
import { signOut } from "firebase/auth";
import "../styles/LogOut.css";

import Cookies from "universal-cookie";

const cookies = new Cookies();

export const LogOut = ({ children, isUserLoggedIn, setUserLoggedIn, setIsInChat }) => {
  const signUserOut = async () => {
    await signOut(loginDetails);
    cookies.remove("auth-token");
    setUserLoggedIn(false);
    setIsInChat(false);
  };

  return (
    <div className="App">
      
      <div className="app-container">{children}</div>
      {isUserLoggedIn && (
        <div className="sign-out">
          <button onClick={signUserOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};