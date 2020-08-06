import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Conversation from "./Conversation";

//Our own style sheet
import "../../styles.scss";

function Messages(props) {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    axios.get("/messages/userMessages")
      .then(
        (response) => {
          setConversations(response.data);

        }
      );
  }, []);

  let conversation = [];

  for (let conversationID in conversations) {
    let messagesJSX = [];
    for (let message of conversations[conversationID]) {
      console.log(conversations[conversationID]);
      let messageContent = (
        <div className="message-content">
          <h6>Conversation ID: {message.id}</h6>
          <h6>Sent By: {message.sender_id}</h6>
          <h6>Received By: {message.receiver_id}</h6>
          <h6>Message: {message.message_text}</h6>
          <h6>Time Sent: {message.time_sent}</h6>
        </div>
      );
      messagesJSX.push(messageContent);
    }
    conversation.push(<Conversation>{messagesJSX}</Conversation>);
  }

  return < div className="messages-container" >
    <h3>Hello {props.user.first_name}</h3>
    {conversation}
  </div >;

}

export default Messages;
;
