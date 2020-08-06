import React from "react";
import "../../styles.scss";

function Conversation(props) {
  return <div className="conversation">
    <figure>
      {props.children}
    </figure>
    <hr></hr>
  </div>;
}

export default Conversation;
