import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Conversation from "./Conversation";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, Fade } from "@material-ui/core";

// react-bootstrap
import { Form } from "react-bootstrap";

//Our own style sheet
import "../../styles.scss";

function NewMessage(props) {

  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (redirect) {
    return (
      <Redirect to="/home" />);
  }

  console.log("New Message Props", props);

  const onSubmitHandler = function (event) {
    event.preventDefault();
    addMessage({
      message: event.target.elements['formBasicFirstname'].value,
      receiver_id: props.receiver.user_id,
    });

  };
  const addMessage = function (messageData) {
    axios.post("/messages/newMessage", messageData)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div>
      <div className="new-message-container">
        Send a message to {props.receiver.first_name} {props.receiver.last_name}
        <Form onSubmit={onSubmitHandler}>
          <Form.Group controlId="formBasicFirstname">
            <Form.Control type="firstname" placeholder="Enter Message" />
          </Form.Group>
          <Button variant="contained" color="primary" type="submit" onClick={handleOpen}>
            Send
            </Button>
        </Form>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="new-message-modal"
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            <div className="successful-message">
              <h2>Message successfuly sent to {props.receiver.first_name} {props.receiver.last_name}</h2>
              <button onClick={() => setRedirect(true)}>Close</button>
            </div>
          </Fade>
        </Modal>

      </div>
    </div >
  );
}

export default NewMessage;