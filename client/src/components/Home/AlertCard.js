import React, { useState, useEffect } from "react";
import "../../styles.scss";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "axios";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import ChatTwoToneIcon from "@material-ui/icons/ChatTwoTone";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  medium: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

export default function AlertCard(props) {
  const classes = useStyles();
  // Manages the state of the user
  const [userForAlert, setUserForAlert] = useState(null);

  //Gets user info for the alert
  const getUserForAlert = (id) => {
    axios.get("/users/profile-info").then((response) => {
      const users = response.data;
      const userForAlert = users.find((user) => user.id === id);
      setUserForAlert(userForAlert);
    });
  };
  useEffect(() => {
    getUserForAlert(props.user_id);
  }, []);

  return (
    <div className="item">
      {userForAlert && (
        <Alert severity="error">
          <AlertTitle>{props.title}</AlertTitle>
          <section className="alert-container">
            <article>
              <header>
                <div>
                  <img src={userForAlert.profile_photo} alt="" />
                  <h6>
                    {userForAlert.first_name} {userForAlert.last_name}
                  </h6>
                </div>
                <div>
                  <IconButton>
                    <ChatTwoToneIcon
                      className={classes.medium}
                    ></ChatTwoToneIcon>
                  </IconButton>
                </div>
              </header>
              <div>
                <p>Posted {moment(props.time_created).fromNow()}</p>
              </div>
              <div>
                <img src={props.photo} alt="" />
              </div>
              <div id="alert-display">
                <p>{props.description}</p>
              </div>
            </article>
          </section>
        </Alert>
      )}
    </div>
  );
}
