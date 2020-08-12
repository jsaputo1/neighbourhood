import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

//Material-kit-component styling and components (try to avoid understanding it, too confusing...)
import styles from "./Material-kit-components/landingPage.js";
import Parallax from "./Material-kit-components/Parallax.js";

// our own style sheet
import "../../styles.scss";

const useStyles = makeStyles(styles);

function Landing(props) {
  const classes = useStyles();

  return (
    <div>
      <Parallax filter image={require("../../assets/img/neighbours.jpg")}>
        <div className={classes.container}>
          <div className="main-container">
            {/* <h1>Join your private neighbourhood social network!</h1>
          <h4>
            How many neighbours do you know? The growth of cities, mobility, and
            distrust have weakened our relationships with our neighbours. You
            have now the opportunity to connect and create a community.
          </h4> */}
            <img src="/title.png" alt="CupOSugah"></img>
            <br />
            <div className="button-container">
              <a class="btn btn-primary " href="/login" role="button">
                LOGIN
              </a>
              <a class="btn btn-primary" href="/register" role="button">
                REGISTER
              </a>
            </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
}

export default Landing;
