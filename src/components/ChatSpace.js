/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { fireStoreDb, loginDetails } from "../firebase-config-setting";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import "../styles/ChatSpace.css";


export const ChatSpace = ({ isRoom }) => {
  const [messages, setTxtMessages] = useState([]);
  const [newMessage, setNewTxt] = useState("");
  const messagesRef = collection(fireStoreDb, "messages");

  useEffect(() => {
    const queryFilters = query(
      messagesRef,
      where("isRoom", "==", isRoom),
      orderBy("createdAt")
    );
    const clearUseEff = onSnapshot(queryFilters, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
    //   console.log(messages);
      setTxtMessages(messages);
    });

    return () => clearUseEff();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: loginDetails.currentUser.displayName,
      displayPhoto : loginDetails.currentUser.photoURL,
      uid: loginDetails.currentUser.uid,
      isRoom,
    });

    setNewTxt("");
  };

  


  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {isRoom.toUpperCase()}</h1>
      </div>
      <div className="messages">
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>

      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewTxt(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );

  function ChatMessage(props) {
    const { text, user, displayPhoto } = props.message;
  
   const messageClass = user === loginDetails.currentUser.displayName ? 'sent' : 'received';
    console.log(user);
    console.log(loginDetails.currentUser.user);
  
    return (<>
      <div  className={`message ${messageClass}`}>
        <img src={displayPhoto} />
           
            <p>{text}</p>
      </div>
    </>)
  }
};