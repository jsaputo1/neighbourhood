import React, { useState, useEffect } from "react";
import "../../styles.scss";
import { Form } from "react-bootstrap";
import axios from 'axios';

function Conversation(props) {

  const onSubmitHandler = function (event) {
    event.preventDefault();
    const message = event.target.elements['message'].value;
    sendReply({
      message,
      receiver_id: props.receiver_id,
      conversation_id: props.conversation_id
    });
    props.conversations(message);
  };

  const sendReply = function (messageData) {
    axios.post("/messages/reply", messageData)
      .then(response => {
        return { message: response.target.elements['message'].value },
          props.conversations(response.data);
      });
  };

  return <div className="conversation">
    <figure>
      <h2 className="conversation-header">Converastion with {props.receiver_id}</h2>
      {props.children}
      <Form className="message-input" onSubmit={onSubmitHandler}>
        <Form.Group controlId="message">
          <Form.Control type="message" placeholder="Enter message" />
        </Form.Group>
        <button>Send</button>
      </Form>
    </figure>

  </div>;
}

export default Conversation;


