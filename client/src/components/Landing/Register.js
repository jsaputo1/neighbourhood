import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

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


function Register(props) {

  const [neighbourhoodRedirect, setneighbourhoodRedirect] = useState(false);
  const [coordinates, setCoordinates] = useState({ longitude: null, latitude: null });

  const classes = useStyles();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(e => {
      setCoordinates({
        longitude: e.coords.longitude,
        latitude: e.coords.latitude
      });
    });
  }, []);

  const onSubmitHandler = function (event) {
    event.preventDefault();
    registerUser({
      firstName: event.target.elements['formBasicFirstname'].value,
      lastName: event.target.elements['formBasicLastname'].value,
      email: event.target.elements['formBasicEmail'].value,
      password: event.target.elements['formBasicPassword'].value,
      coordinates
    });
  };

  const registerUser = function (registrationData) {
    axios.post("/users/register", registrationData)
      .then(() =>
        setneighbourhoodRedirect(true)
      )
      .catch((err) => {
        alert("E-Mail is already registered");
      });
  };

  if (neighbourhoodRedirect) {
    return (
      <Redirect to="/selectNeighbourhood" />);
  }

  return (
    <div>
      <Parallax filter image={require("../../assets/img/neighbours.jpg")}>
        <div className={classes.containerLogin}>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group controlId="formBasicFirstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="firstname" placeholder="First name" />
            </Form.Group>
            <Form.Group controlId="formBasicLastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="lastname" placeholder="Last name" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
      </Parallax>
    </div>
  );
}

export default Register;
