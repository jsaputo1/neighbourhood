import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

// react-bootstrap
import { Form } from "react-bootstrap";

//Material-kit-component styling and components (try to avoid understanding it, too confusing...)
import styles from "./Material-kit-components/landingPage.js";
import Parallax from "./Material-kit-components/Parallax.js";

//Our own style sheet
import "../../styles.scss";

const useStyles = makeStyles(styles);

function Login(props) {
  const classes = useStyles();

  return (
    <div>
      <Parallax filter image={require("../../assets/img/neighbours.jpg")}>
        <div className={classes.containerLogin}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </Parallax>
    </div>
  );
}

export default Login;
