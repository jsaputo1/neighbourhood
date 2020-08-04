import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

// react-bootstrap
import { Form } from "react-bootstrap";

// core components
import Parallax from "./Material-kit-components/Parallax.js";

import styles from "./Material-kit-components/landingPage.js";
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
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Parallax>
    </div>
  );
}

export default Login;
