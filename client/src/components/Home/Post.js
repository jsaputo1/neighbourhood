import React from "react";
import "../../styles.scss";
import moment from "moment";

function Post(props) {
  return (
    <div class="card gedf-card">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex justify-content-between align-items-center">
            <div class="mr-2">
              <img
                class="rounded-circle"
                width="45"
                src={props.user_photo}
                alt=""
              ></img>
            </div>
            <div class="ml-2">
              <div class="h5 m-0">
                {props.user_first_name} {props.user_last_name}
              </div>
              <div class="h7 text-muted">Miracles Lee Cross</div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div class="card-body">
        <div class="text-muted h7 mb-2">
          {" "}
          <i class="fa fa-clock-o"></i>
          {" " + moment(props.time_created).fromNow()}
        </div>

        <h5 class="card-title">{props.post_title}</h5>

        <p class="card-text">{props.post_description}</p>
      </div>
    </div>
  );
}

export default Post;
