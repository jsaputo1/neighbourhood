import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Conversation from "./Conversation";
import moment from "moment";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, Fade } from "@material-ui/core";

// react-bootstrap
import { Form } from "react-bootstrap";

//Our own style sheet
import "../../styles.scss";

function NewMessage(props) {

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get(`/messages/conversation?receiver_id=${props.receiver.user_id}`)
      .then(
        (response) => {
          setConversations(response.data);
        }
      );
  }, [messages]);

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
    conversation.push(
      <Conversation
        conversation_id={conversationID}
        receiver_id={conversations[conversationID][0].sender_id === props.user_id ? conversations[conversationID][0].receiver_id : conversations[conversationID][0].sender_id}
        conversations={setMessages}
      >
        {messagesJSX}
      </Conversation>);
  }

  return < div className="messages-container" >
    {conversation}
  </div >;
}

export default NewMessage;