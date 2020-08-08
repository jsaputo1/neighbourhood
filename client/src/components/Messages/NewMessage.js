import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

// react-bootstrap
import { Form } from "react-bootstrap";

//Our own style sheet
import "../../styles.scss";

function NewMessage(props) {

  console.log("Props", props);

  // const [redirect, setRedirect] = useState(false);

  // if (redirect) {
  //   return (
  //     <Redirect to="/messagesuccess" />);
  // }

  const onSubmitHandler = function (event) {
    event.preventDefault();
    registerUser({
      message: event.target.elements['formBasicFirstname'].value,
      senderID: props.user.id,
      receiverID: props.receiverID
    });
  };

  const registerUser = function (messageData) {
    axios.post("/messages/newMessage", messageData)
      .then((response) => {
        console.log(response);
      });
  };


  return (
    <div>
      <div className="new-message-container">
        Send a message to "user id:"
        {props.receiverID}
        <Form onSubmit={onSubmitHandler}>
          <Form.Group controlId="formBasicFirstname">
            <Form.Control type="firstname" placeholder="Enter Message" />
          </Form.Group>
          <Button variant="contained" color="primary" type="submit">
            Send
            </Button>
        </Form>
      </div>
    </div>
  );
}

export default NewMessage;
