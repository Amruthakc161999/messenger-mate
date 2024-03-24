
import { useState } from 'react';
import './App.css';
import { LoginPage } from './components/LoginPage';
import {ChatSpace} from './components/ChatSpace';
import Cookies from "universal-cookie";
import { LogOut } from './components/LogOut';

const cookies = new Cookies();

function App() {

  const [isUserLoggedIn,setUserLoggedIn] = useState(cookies.get("access_token"));
  const [isRoom,setRoomForUser] = useState("");
  const [isInChat, setIsInChat] = useState(null);
 


  if(!isUserLoggedIn){
  return (
    <LogOut
    isUserLoggedIn={isUserLoggedIn}
    setUserLoggedIn={setUserLoggedIn}
    setIsInChat={setIsInChat}
  >
     <LoginPage setUserLoggedIn={setUserLoggedIn}/>
  </LogOut>

  );
  }

  return (
    <LogOut isUserLoggedIn={isUserLoggedIn}
    setUserLoggedIn={setUserLoggedIn} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className="room">
          <label> Type room name: </label>
          <input onChange={(e) => setRoomForUser(e.target.value)} />
          <button
            onClick={() => {
              setIsInChat(true);
            }}
          >
            Enter Chat
          </button>
        </div>
      ) : (
        <ChatSpace isRoom={isRoom} /> 
      )}
    </LogOut>
  );
}

export default App;
