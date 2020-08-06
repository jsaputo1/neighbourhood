import React from "react";
import "../../styles.scss";

function Conversation(props) {
  return <div className="conversation">
    <figure>
      {props.children}
    </figure>
  </div>;
}

export default Conversation;
