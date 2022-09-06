import React, { useEffect, useState, useRef } from "react";
import {
  Send,
 } from '@mui/icons-material';

import { sendChatMessage } from "../utils/WebSocket";
import { getDateTime, getDayMonth } from "../utils/datesFormatter";

export default function Chat(props) {
  const { client, addMessage, messages } = props;
  const [userInput, setUserInput] = useState("");
  const downKeeper = useRef();

  useEffect(() => {
    downKeeper.current.scrollIntoView({
      behavior: 'smooth',
      block: "nearest",
      inline: "start"});
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    sendChatMessage(client, userInput);
    const message = {
      name: process.env.REACT_APP_WEBSOCKET_USERNAME,
      content: userInput,
      date: new Date()
    }
    addMessage([message, "sent"]);
    setUserInput("");
    downKeeper.current.scrollIntoView({
      behavior: 'smooth',
      block: "nearest",
      inline: "start" });
  }

  return (
    <div className="bg-secondary rounded-container chat-container">
      <div className="center chat-header">
        <h3>Chat 💬</h3>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message[1]}`} id={`${message[0].level}`}>
            <div className="chat-message-header">
              <h4>{message[0].name}</h4>
              <div className="dates">
                <p>{getDayMonth(new Date(message[0].date))}</p>
                <h5>{getDateTime(new Date(message[0].date))}</h5>
              </div>
            </div>
            <p>{message[0].content}</p>
          </div>
        ))}
        <span ref={downKeeper}></span>
      </div>
      <div>
        <form className="chat-input center" onSubmit={sendMessage}>
          <input className="bg-primary-600" value={userInput} onChange={(e) => setUserInput(e.target.value)} type="text" placeholder="Escribe un mensaje" />
          <button className="center send-button" type="submit">
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
}
