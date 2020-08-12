import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Form } from "react-bootstrap";
import styles from "../Material-kit-components/landingPage.js";
import Parallax from "../Material-kit-components/Parallax.js";
import { Link } from "react-router-dom";
import "../../styles.scss";

const useStyles = makeStyles(styles);

function EditUserInformation(props) {

    const [accountRedirect, setAccountRedirect] = useState(false);
    const classes = useStyles();

    const onSubmitHandler = function (event) {
        event.preventDefault();
        registerUser({
            firstName: event.target.elements['formBasicFirstname'].value,
            lastName: event.target.elements['formBasicLastname'].value,
            email: event.target.elements['formBasicEmail'].value,
            phone_number: event.target.elements['formBasicPhoneNumber'].value,
            profile_photo: event.target.elements['formBasicProfilePhoto'].value,
            bio: event.target.elements['formBasicBio'].value,
            id: props.user.id
        });
    };

    const registerUser = function (registrationData) {
        axios.post("/users/edit", registrationData)
            .then((response) => {
                setAccountRedirect(true);
                props.editUser(response.data);
            })
            .catch((err) => {
                alert(err);
            });
    };

    if (accountRedirect) {
        return (
            <Redirect to="/account" />);
    }

    return (
        <div>
            <Parallax className="edit-user-information-container">
                <div className={classes.containerLogin}>
                    <Form onSubmit={onSubmitHandler} className="card box">
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
                            <Form.Label>Profile Photo (URL or blank)</Form.Label>
                            <Form.Control defaultValue={props.user.profile_photo === 'https://i.imgur.com/j6IJGS2.png' ? '' : props.user.profile_photo} type="url" />
                        </Form.Group>

                        <Form.Group controlId="formBasicBio">
                            <Form.Label>Write a Bio</Form.Label>
                            <Form.Control defaultValue={props.user.bio} as="textarea" rows="3" type="textarea" placeholder="Write something about yourself" />
                        </Form.Group>

                        <Link className="change-neighbourhood-link" to="/selectNeighbourhood">
                            <h2>Change Neighbourhood</h2>
                        </Link>

                        <div className="edit-form-buttons">
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                         </Button>
                            <Button onClick={() => setAccountRedirect(true)} variant="contained" color="primary" type="button">
                                Cancel
                        </Button>
                        </div>
                    </Form>
                </div>
            </Parallax>
        </div>
    );
}

export default EditUserInformation;
