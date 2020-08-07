import React from "react";
import "../../styles.scss";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
export default function AlertCard(props) {
  const classes = useStyles();
  return (
    <div className="item">
      <Alert severity="error">
        <AlertTitle>Alert!</AlertTitle>
        <section class="alert-container">
          <article>
            <header>
              <div>
                <img src="${tweet.user.avatars}" />
                <h6>Samantha Gadet</h6>
              </div>
            </header>
            <div>
              <p>Created yesterday</p>
            </div>
            <div id="alert-display">
              <p>
                j'ai perdu mon
                chat!chchchchcchchchchchchchchchchcchchchchchchchchchchchcchchchchchchcchch
              </p>
            </div>
          </article>
        </section>
      </Alert>
    </div>
  );
}
