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
        <Form onSubmit={onSubmitHandler}>
          <h2 className="new-message-header">Send a message to {props.receiver.first_name} {props.receiver.last_name}</h2>
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
          className="successful-message"
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >

          <div className="successful-message">
            <h2>Message successfuly sent to {props.receiver.first_name} {props.receiver.last_name}</h2>
            <button onClick={() => setRedirect(true)}>Close</button>
          </div>

        </Modal>

      </div>
    </div >
  );
}

export default NewMessage;




// import React, { useState, useEffect } from "react";
// import { Redirect } from "react-router-dom";
// import axios from "axios";
// import Conversation from "./Conversation";
// import moment from "moment";

// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// import { Button, Modal, Fade } from "@material-ui/core";

// // react-bootstrap
// import { Form } from "react-bootstrap";

// //Our own style sheet
// import "../../styles.scss";

// function NewMessage(props) {

//   console.log("New Message Props", props);

//   const [conversations, setConversations] = useState([]);
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     let conversationData = { test: 'test' };
//     let isMounted = true;
//     axios.get("/messages/conversation", conversationData)
//       .then(
//         (response) => {
//           if (isMounted) setConversations(response.data);
//         }
//       );
//     return () => { isMounted = false; };

//   }, [messages]);

//   const onSubmitHandler = function (event) {
//     event.preventDefault();
//     addMessage({
//       message: event.target.elements['formBasicFirstname'].value,
//       receiver_id: props.receiver.user_id,
//     });

//   };
//   const addMessage = function (messageData) {
//     axios.post("/messages/newMessage", messageData)
//       .then((response) => {
//         console.log(response);
//       });
//   };

//   let conversation = [];

//   for (let conversationID in conversations) {
//     let messagesJSX = [];
//     for (let message of conversations[conversationID]) {
//       let messageContent = (
//         <div className={message.sender_id === props.user.id ? " sent" : " received"}>
//           <h2 className="sender">User ID {message.sender_id}:</h2>
//           <h2 className="message-content">{message.message_text}</h2>
//           <h2 className="timestamp">{moment(message.time_sent, "").fromNow()}</h2>
//         </div >
//       );
//       messagesJSX.push(messageContent);
//     }
//     conversation.push(
//       <Conversation
//         conversation_id={conversationID}
//         receiver_id={conversations[conversationID][0].sender_id === props.user_id ? conversations[conversationID][0].receiver_id : conversations[conversationID][0].sender_id}
//         conversations={setMessages}
//       >
//         {messagesJSX}
//       </Conversation>);
//   }

//   return < div className="messages-container" >
//     <h3>Hello {props.user.first_name}, {props.user.id}</h3>
//     {conversation}
//   </div >;
// }

// export default NewMessage;


