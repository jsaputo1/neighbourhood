import React from "react";
import "../../styles.scss";
import moment from "moment";
import { Link } from "react-router-dom";

import {
    Button,
    Avatar,
    Card,
    CardActionArea,
    CardHeader,
    CardContent,
    CardMedia,
    Typography,
    FormControl,
    InputLabel,
    Select,
    Modal,
    Backdrop,
    Fade,
    FormGroup,
} from "@material-ui/core";
import { Form } from "react-bootstrap";

function ServicePost(props) {
    const setReceiver = function (data) {
        props.setReceiver(data);
    };

    const receiverObject = {
        first_name: props.user_first_name,
        last_name: props.user_last_name,
        user_id: props.user_id,
    };
    return (
        <div className="box">
            <div className="card gedf-card">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="mr-2">
                            <img
                                className="rounded-circle"
                                width="45"
                                src={props.user_photo}
                                alt=""
                            ></img>
                        </div>
                        <div className="ml-2">
                            <div className="h5 m-0">
                                {props.user_first_name} {props.user_last_name} {props.requestOrOffer}
                            </div>
                            <div className="h7 text-muted">
                                {" " + moment(props.time_created).fromNow()}
                            </div>
                        </div>
                    </div>




                    {props.current_user_id === props.user_id ?

                        <div>
                            <Button onClick={props.handleOpenDelete}>
                                DELETE Service
</Button>
                            <Modal
                                aria-labelledby="Moo"
                                aria-describedby="Moo"
                                className={props.modalClass}
                                open={props.openDelete}
                                onClose={props.handleCloseDelete}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={props.openDelete}>
                                    <div className={props.paperClass}>
                                        <h2 id="transition-modal-title">Are you sure you would like to delete this Service?</h2>
                                        <Form data-message={props.id} onSubmit={props.deleteSubmitHandler}>

                                            <Button variant="contained" color="secondary" type="submit">
                                                Confirm
</Button>
                                            <Button onClick={props.handleCloseDelete} variant="contained" color="primary" type="button">
                                                Cancel
</Button>
                                        </Form>
                                    </div>
                                </Fade>
                            </Modal>
                        </div>
                        :


                        <Link className="message-icon" to={{ pathname: "/newmessage" }}>
                            <i
                                class="fa fa-comment-o fa-2x"
                                aria-hidden="true"
                                onClick={() => setReceiver(receiverObject)}
                            ></i>
                        </Link>


                    }


                </div>
            </div>
            <div className="card-body">
                <div className="text-muted h7 mb-2">
                    {" "}
                    <i className="fa fa-clock-o fa-2x"></i>
                    {}
                    {" " + moment(props.event_date).calendar()}
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <h5 className="card-title">{props.post_title}</h5>
                    </li>
                    <li className="list-group-item">
                        <img className="post-photo" src={props.post_photo} alt=""></img>
                    </li>
                    <li className="list-group-item">
                        <p className="card-text">{props.post_description}</p>
                    </li>
                </ul>

            </div>
        </div>
    );
}

export default ServicePost;
