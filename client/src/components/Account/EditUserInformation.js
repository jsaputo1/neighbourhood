import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

// react-bootstrap
import { Form } from "react-bootstrap";

//Material-kit-component styling and components (try to avoid understanding it, too confusing...)
import styles from "../Material-kit-components/landingPage.js";
import Parallax from "../Material-kit-components/Parallax.js";

//Our own style sheet
import "../../styles.scss";

const useStyles = makeStyles(styles);

function EditUserInformation(props) {

    const [neighbourhoodRedirect, setneighbourhoodRedirect] = useState(false);
    const [accountRedirect, setAccountRedirect] = useState(false);
    // const [coordinates, setCoordinates] = useState({ longitude: null, latitude: null });

    const classes = useStyles();

    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition(e => {
    //         setCoordinates({
    //             longitude: e.coords.longitude,
    //             latitude: e.coords.latitude
    //         });
    //     });
    // }, []);

    const onSubmitHandler = function (event) {
        event.preventDefault();
        console.log("SUBMIT", event)
        registerUser({
            firstName: event.target.elements['formBasicFirstname'].value,
            lastName: event.target.elements['formBasicLastname'].value,
            email: event.target.elements['formBasicEmail'].value,
            phone_number: event.target.elements['formBasicPhoneNumber'].value,
            profile_photo: event.target.elements['formBasicProfilePhoto'].value,
            bio: event.target.elements['formBasicBio'].value,
            id: props.user.id
        });
        {/* <Redirect to="/account" /> */ }
    };




    const registerUser = function (registrationData) {
        axios.post("/users/edit", registrationData)
            .then((response) => {
                setAccountRedirect(true);
                props.editUser(response.data);
            }

            )
            .catch((err) => {
                alert(err);
            });
    };




    // const changeUserLocationAndNeighbourhood = function (registrationData) {
    //     axios.post("/users/edit", registrationData)
    //         .then((response) => {
    //             setneighbourhoodRedirect(true);
    //             props.editUser(response.data);
    //         }

    //         )
    //         .catch((err) => {
    //             alert("E-Mail is already registered");
    //         });
    // };

    if (accountRedirect) {
        return (
            <Redirect to="/account" />);
    }

    return (
        <div>
            <Parallax filter image={require("../../assets/img/apartment2.jpg")}>
                <div className={classes.containerLogin}>
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group controlId="formBasicFirstname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control defaultValue={props.user.first_name} type="firstname" placeholder="First name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicLastname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control defaultValue={props.user.last_name} type="lastname" placeholder="Last name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control defaultValue={props.user.email} type="email" placeholder="Enter email" />
                        </Form.Group>


                        <Form.Group controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control defaultValue={props.user.phone_number} type="tel" placeholder="Phone Number" />
                        </Form.Group>

                        <Form.Group controlId="formBasicProfilePhoto">
                            <Form.Label>Profile Photo (URL)</Form.Label>
                            <Form.Control defaultValue={props.user.profile_photo} type="url" placeholder="Provide URL" />
                        </Form.Group>

                        <Form.Group controlId="formBasicBio">
                            <Form.Label>Write a Bio</Form.Label>
                            <Form.Control defaultValue={props.user.bio} as="textarea" rows="3" type="textarea" placeholder="PassworBiod" />
                        </Form.Group>

                        <Button variant="contained" color="primary" type="submit">
                            Register
            </Button>
                        <Button onClick={() => setAccountRedirect(true)} variant="contained" color="primary" type="button">
                            Cancel
                        </Button>
                    </Form>
                </div>
            </Parallax>
        </div>
    );
}

export default EditUserInformation;
