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

  const [userFirstName, setUserFirstName] = useState([]);
  const getUserInfo = function (userID) {
    axios.get(`/messages/userinfo?id=${userID}`)
      .then(
        (response) => {
          setUserFirstName(response.data.first_name + " " + response.data.last_name);
        }
      );
  };

  return <div className="conversation">
    <figure>
      <h2>{() => test}</h2>
      <h2 className="conversation-header">Converastion with {getUserInfo(props.receiver_id)} {userFirstName} </h2>
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


