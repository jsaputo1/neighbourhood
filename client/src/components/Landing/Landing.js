import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

// core components
import GridContainer from "./Material-kit-components/GridContainer.js";
import GridItem from "./Material-kit-components/GridItem.js";
import Parallax from "./Material-kit-components/Parallax.js";

import styles from "./Material-kit-components/landingPage.js";
import "../../styles.scss";

const useStyles = makeStyles(styles);

function Landing(props) {
  const classes = useStyles();

  return (
    <div>
      <Parallax filter image={require("../../assets/img/neighbours.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1>Join your private neighbourhood social network!</h1>
              <h4>
                How many neighbours do you know? The growth of cities, mobility,
                and distrust have weakened our relationships with our
                neighbours. You have now the opportunity to connect and create a
                community.
              </h4>
              <br />
              <div className="button-container">
                <div className="button">
                  <Button
                    className="button"
                    variant="contained"
                    color="primary"
                    href="/login"
                  >
                    Login
                  </Button>
                </div>
                <Button variant="contained" color="primary" href="/register">
                  Register
                </Button>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
    </div>
  );
}

export default Landing;
