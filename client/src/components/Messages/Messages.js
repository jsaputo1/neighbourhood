import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Conversation from "./Conversation";
import moment from 'moment';


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
      let messageContent = (
        <div className={message.sender_id === props.user.id ? " sent" : " received"}>
          <h2 className="sender">User ID {message.sender_id}:</h2>
          <h2 className="message-content">{message.message_text}</h2>
          <h2 className="timestamp">{moment(message.time_sent, "").fromNow()}</h2>
        </div >
      );
      messagesJSX.push(messageContent);
    }
    conversation.push(<Conversation>{messagesJSX}</Conversation>);
  }

  return < div className="messages-container" >
    <h3>Hello {props.user.first_name}, {props.user.id}</h3>
    {conversation}
  </div >;

}

export default Messages;
;

