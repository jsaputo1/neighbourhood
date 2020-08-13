import React, { useState, useEffect } from "react";
import "../../styles.scss";
import moment from "moment";
import { Modal, Backdrop } from "@material-ui/core";
import NewMessage from "../Messages/NewMessage";

export default function AlertCard(props) {

  const [openMessages, setOpenMessages] = useState(false);
  const handleOpenMessages = () => {
    setOpenMessages(true);
  };

  const handleCloseMessages = () => {
    setOpenMessages(false);
  };
  const setReceiver = function (data) {
    props.setReceiver(data);
  };
  const receiverObject = {
    first_name: props.user_first_name,
    last_name: props.user_last_name,
    user_id: props.user_id,
  };
  return (
    <div className="alert">
      <div className="card gedf-card">
        <div className="alert-title">
          <i class="fa fa-exclamation-circle fa-2x" aria-hidden="true"></i>
          <h5>{props.title}</h5>
        </div>
        <div className="alert-card">
          <div className="alert-header">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center">
                <div className="mr-2">
                  <img
                    className="rounded-circle"
                    width="45"
                    src={props.user_photo}
                    alt=""
                  ></img>
                </div>
                <div className="ml-2">
                  <div className="h5 m-0">
                    {props.user_first_name} {props.user_last_name}
                  </div>
                  <div className="h7 text-muted">
                    {" " + moment(props.time_created).fromNow()}
                  </div>
                </div>
              </div>

              {props.user.id !== props.user_id && (
                <div className="message-modal-prompt">
                  <Modal
                    open={openMessages}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    onClose={handleCloseMessages}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <NewMessage receiver={receiverObject} user={props.user} handleCloseMessages={handleCloseMessages}></NewMessage>
                  </Modal>
                  <i
                    className="fa fa-comment-o fa-2x"
                    aria-hidden="true"
                    onClick={handleOpenMessages}
                  ></i>
                </div>
              )}
            </div>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <img
                  className="caroussel-post-photo "
                  src={props.photo}
                  alt=""
                ></img>
              </li>
              <li className="list-group-item">
                <p className="card-text">{props.description}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
