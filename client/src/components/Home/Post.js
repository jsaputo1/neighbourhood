import React from "react";
import "../../styles.scss";
import moment from "moment";

function Post(props) {
  return (
    <div className="card gedf-card">
      <div className="card-header">
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
          <i class="fa fa-comment-o fa-2x" aria-hidden="true"></i>
        </div>
      </div>
      <div className="card-body">
        <div className="text-muted h7 mb-2">
          {" "}
          <i className="fa fa-clock-o fa-2x"></i>
          {}
          {" " + moment(props.event_date).calendar()}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <h5 className="card-title">{props.post_title}</h5>
          </li>
          <li className="list-group-item">
            <img className="post-photo" src={props.post_photo} alt=""></img>
          </li>
          <li className="list-group-item">
            <p className="card-text">{props.post_description}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Post;
