import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

//Our own style sheet
import "../../styles.scss";

function Messages(props) {
  return <div className="messages-container">
    <h3>Hello {props.user.first_name}</h3>
  </div>;

}

export default Messages;
