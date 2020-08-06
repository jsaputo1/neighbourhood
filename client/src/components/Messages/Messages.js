import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

//Our own style sheet
import "../../styles.scss";

function Messages(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/userMessages")
      .then(
        (response) => {
          setMessages(response.data);
          console.log(response.data);
        }
      );
  }, []);

  return <div className="messages-container">
    <h3>Hello {props.user.first_name}</h3>
    <div className="individual-message">
      {messages.map(i => (
        <figure key={i.id}>
          <h6>Conversation ID: {i.conversation_id}</h6>
          <h6>Sent By: {i.sender_id}</h6>
          <h6>Received By: {i.receiver_id}</h6>
          <h6>Message: {i.message_text}</h6>
          <h6>Time Sent: {i.time_sent}</h6>
        </figure>
      ))}
    </div>

  </div>;

}

export default Messages;
