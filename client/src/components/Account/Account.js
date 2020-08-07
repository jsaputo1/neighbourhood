import React, { useState, useEffect } from "react";
import moment from 'moment';
import axios from "axios";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Button, Avatar, Card, CardActionArea, CardHeader, CardContent, CardMedia, Typography, FormControl, InputLabel, Select, Modal, Backdrop, Fade, FormGroup } from "@material-ui/core";
import { Form } from "react-bootstrap";


// core components 
import GridContainer from "../Material-kit-components/GridContainer.js";
import GridItem from "../Material-kit-components/GridItem.js";
import Parallax from "../Material-kit-components/Parallax.js";

// import styles from "./Material-kit-components/landingPage.js";
import "../../styles.scss";

//for Material UI
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  rootCard: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

moment().format();


function Account(props) {
  const classes = useStyles();

  const [neighbourhood, setNeighbourhood] = useState([]);
  const [open, setOpen] = React.useState(false);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const fetchAccountInfo = async () => {
    const accountInfo = await axios.get('http://localhost:8001/account');
    const neighbourhoodInfo = accountInfo.data.filter(neighbourhood => neighbourhood.id === props.user.neighbourhood_id)[0]
    setNeighbourhood(neighbourhoodInfo);
  };

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  // these functions handle the Modal
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (

    <div>
      <Parallax image={require(`../../assets/img/apartment${getRandomInt(1, 3)}.jpg`)}>
        <div className={classes.container}>
          <Card className={classes.root}>
            <CardActionArea>
              <Avatar alt={`${props.user.first_name} ${props.user.last_name}`} src={props.user.profile_photo} className={classes.large} />
              <p>{props.user.first_name}</p>
              <p>{props.user.last_name}</p>
              <p>{props.user.phone_number}</p>
              <p>{props.user.email}</p>
              <p>{neighbourhood.name}</p>
              <button type="button" onClick={handleOpen}>
                Manage Alerts and Subsciptions
                    </button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className={classes.paper}>
                    <h2 id="transition-modal-title">
                      Post New Service Listing
                          </h2>

                  </div>
                </Fade>
              </Modal>
            </CardActionArea>
          </Card>
        </div>
      </Parallax>
    </div>

  );
}

export default Account;
