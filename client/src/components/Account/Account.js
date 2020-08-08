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
  const [state, setState] = React.useState({
    selectedAlert_Type: "Both",
  });


  const [checked, setChecked] = useState({
    1: false, 2: false, 3: false, 4: false, 5: false,
    6: false, 7: false, 8: false, 9: false, 10: false,
    11: false, 12: false, 13: false, 14: false, 15: false,
    16: false, 17: false, 18: false, 19: false, 20: false,
    21: false,
  });

  const handleClick = (e) => {
    const boxName = e.target.name
    setChecked({
      ...checked,
      [boxName]: !checked[boxName]
    });
  }

  console.log(checked);


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

  function changeAlert_Type(e) {
    // console.log(e.target.value)
    setState({
      ...state,
      selectedAlert_Type: e.target.value,
    });
  }


  // these functions handle the Modal REFACTORASFASD ASDASDFASDLFUASFIUHASdfJASPODFJA:OIDFJ"APWOKDAWASDFASDASDDSA
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const filterCategories = (filter) => {
    const filtered = props.categories.filter(category => category.category_type === filter)
    return (filtered)
  };

  const sortSubscriptions = function (subscriptions) {
    let createSubs = []
    for (const entry in subscriptions) {
      if (subscriptions[entry] === true) {
        createSubs.push(entry)
      }
    }
    return createSubs;
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("SUBMIT")
    updateSubscriptionPreferences({
      alert_type: state.selectedAlert_Type,
      subscriptions: sortSubscriptions(checked),
      user_id: props.user.id
    });
    //some king of route posting to subscriptions and users (for the subscription methods)

  }



  /// 1. send an update function the createSubs array.
  // 2. the function first deletes all subscriptions, and then creates a new subscription for each ID in the createSubs array. Each individual subscription
  // makes its own singular, unique db query.
  // this is HACKY AS FUCK but with limited time and mentor help, and because this is my FFT and and this doesn't have to scale, that is fine.

  const updateSubscriptionPreferences = async function (subscriptionData) {
    console.log('THE THINGS', subscriptionData);
    const newSubscriptions = subscriptionData.subscriptions
    console.log('NEWSIES', newSubscriptions)

    const generateAxiosCalls = function () {
      return Promise.all(newSubscriptions.map((categoryId) => {
        return axios.post("/subscriptions", { user_id: subscriptionData.user_id, category_id: categoryId })
      }
      ));
    };

    await axios.post("/subscriptions/delete", subscriptionData)
      .then(generateAxiosCalls())
      .catch(errors => {
        console.log("errors", errors);
      })
  };




  // (axios.all([
  //   axios.post("/subscriptions", { user_id: subscriptionData.user_id, category_id: 13 }),
  //   axios.post("/subscriptions", { user_id: subscriptionData.user_id, category_id: 14 }),
  //   axios.post("/subscriptions", { user_id: subscriptionData.user_id, category_id: 15 }),
  // ])


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
                      Manage Subscriptions
                          </h2>

                    <Form onSubmit={onSubmitHandler}>
                      <div>
                        <h6><b>Alerts</b></h6>
                        {filterCategories("Alerts").map((category) => (
                          <Form.Check inline
                            name={category.id}
                            onClick={handleClick}
                            key={category.id}
                            value={category.id}
                            label={category.name}
                            type="checkbox"
                            id={category.id} />
                        ))}
                      </div>
                      <div>
                        <h6><b>Events</b></h6>
                        {filterCategories("Events").map((category) => (
                          <Form.Check inline
                            name={category.id}
                            onClick={handleClick}
                            key={category.id}
                            value={category.id}
                            label={category.name}
                            type="checkbox"
                            id={category.id} />
                        ))}
                      </div>
                      <div>
                        <h6><b>Services</b></h6>
                        {filterCategories("Services").map((category) => (
                          <Form.Check inline
                            name={category.id}
                            onClick={handleClick}
                            key={category.id}
                            value={category.id}
                            label={category.name}
                            type="checkbox"
                            id={category.id} />
                        ))}
                      </div>

                      <p>Change Alert Type</p>

                      <FormGroup controlId="serviceCategory">
                        <Form.Label>Select Alert Type</Form.Label>
                        <Form.Control
                          as="select"
                          value={state.selectedAlert_Type}
                          onChange={changeAlert_Type}
                        >
                          <option>Both</option>
                          <option>SMS</option>
                          <option>Email</option>
                          <option>None</option>
                          ))
                        </Form.Control>
                      </FormGroup>

                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Post
                            </Button>
                    </Form>

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
