import React from "react";
import "../../styles.scss";
import { Form } from "react-bootstrap";
import { Button } from "@material-ui/core";

function Conversation(props) {
  return <div className="conversation">
    <figure>
      {props.children}
      <Form className="message-input">
        <Form.Group controlId="message">
          <Form.Control type="firstname" placeholder="Enter message" />
        </Form.Group>
        <button>Send</button>
      </Form>
    </figure>


  </div>;
}

export default Conversation;


