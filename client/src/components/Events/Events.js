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

import filterByCategory from "../Helpers/filterByCategory"

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


function Events(props) {
  const classes = useStyles();



  const fetchEvents = async () => {
    const events = await axios.get('http://localhost:8001/events');
    setEvents(events.data)
  };

  const filterAndSetCategories = (filter) => {
    const filtered = props.categories.filter(category => category.category_type === filter)
    setCategories(filtered)
  };

  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    search: '',
    selectedCategory: ''
  });


  useEffect(() => {
    fetchEvents()
    filterAndSetCategories("Events")
  }, []);




  //////////////////// REFACTOR THESE TOGETHER IF YOU CAN
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  function categoryChange(e) {
    setState({
      ...state,
      selectedCategory: e.target.value
    });
  }
  ////////////////////////



  // these functions handle the Modal
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };



  const fetchFilteredSubscriptions = async (postCategory_id) => {
    const data = await axios.get('http://localhost:8001/subscriptions');
    const filtered = data.data.filter(subscription => subscription.category_id === parseInt(postCategory_id))
    const subscriber_ids = filtered.map(entry => entry = entry.user_id)
    const phoneData = await axios.get('http://localhost:8001/users/phone-numbers');
    const phoneFiltered = phoneData.data.filter(user => subscriber_ids.includes(user.id)).map(entry => `+${entry.phone_number}`)
    return phoneFiltered;
  };

  const sendSubscriptionSMS = async function (postCategory_id) {
    let categoryName = ''
    for (const category of categories) {
      if (category.id === parseInt(postCategory_id)) {
        categoryName = category.name
      }
    }
    const phoneNumbers = await fetchFilteredSubscriptions(postCategory_id)
    axios.post("/twilio", { phoneNumbers, categoryName })
  }



  const onSubmitHandler = function (event) {
    event.preventDefault();
    registerEvent({
      user_id: props.user.id,
      category_id: state.selectedCategory,
      title: event.target.elements['eventTitle'].value,
      description: event.target.elements['eventDescription'].value,
      event_photo: event.target.elements['eventPhoto'].value,
      event_start: '2020-08-13 15:30:00-07',
      event_end: '2020-08-13 19:45:00-07'
    });
    sendSubscriptionSMS(state.selectedCategory);
    handleClose();
  };

  const registerEvent = function (registrationData) {
    console.log('REEGISTAERW', registrationData)
    axios.post("/events", registrationData)
      .then((response) => {
        setEvents(response.data)
      });
  };


  return (

    <div>
      <Parallax image={require("../../assets/img/bbq.jpg")}>
        <div className={classes.container}>
          <Card className={classes.root}>
            <CardActionArea>
              <p>{state.search}</p>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Filter By Category</InputLabel>
                <Select
                  native
                  value={state.search}
                  onChange={handleChange}
                  label="search"
                  inputProps={{
                    name: 'search',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  {categories.map(category => (
                    <option value={category.name}>{category.name}</option>
                  ))}
                </Select>
              </FormControl>


              {props.user ? (
                <div>
                  <h6>{props.user.first_name}</h6>
                  <div>
                    <button type="button" onClick={handleOpen}>
                      Post New Event
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
                          <h2 id="transition-modal-title">Post New Event</h2>
                          <Form onSubmit={onSubmitHandler}>

                            <Form.Group controlId="eventTitle">
                              <Form.Label>Event Title</Form.Label>
                              <Form.Control type="title" placeholder="Title" />
                            </Form.Group>

                            <FormGroup controlId="serviceCategory">
                              <Form.Label>Select Category</Form.Label>
                              <Form.Control
                                as="select"
                                value={state.selectedCategory}
                                onChange={categoryChange}
                              >
                                <option></option>
                                {categories.map(category => (
                                  <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                              </Form.Control>
                            </FormGroup>


                            <Form.Group controlId="eventDescription">
                              <Form.Label>Description</Form.Label>
                              <Form.Control type="description" placeholder="Description" as="textarea" rows="3" />
                            </Form.Group>

                            <Form.Group controlId="eventPhoto">
                              <Form.Label>Photo URL</Form.Label>
                              <Form.Control type="url" placeholder="URL" />
                            </Form.Group>

                            <Button variant="contained" color="primary" type="submit">
                              Post
                            </Button>
                          </Form>
                        </div>
                      </Fade>
                    </Modal>
                  </div>
                </div>
              ) : <div></div>}




            </CardActionArea>
          </Card>

          <h1>...</h1>

          <GridContainer>

            {filterByCategory(events, state.search, categories).map(event => (

              <GridItem xs={12} sm={6} md={3}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <div key={event.id}>

                      <CardMedia
                        className={classes.media}
                        image={event.event_photo}
                        title={event.title}
                      />

                      <CardHeader
                        avatar={
                          <Avatar alt={`${event.first_name} ${event.last_name}`} src={event.profile_photo} className={classes.large} />
                        }
                        title={`${event.first_name} ${event.last_name}`}
                        subheader={`Posted ${moment(event.time_created).fromNow()}`}
                      />
                      <CardContent>
                        <Typography variant="body2" color="textPrimary" component="h3">
                          {event.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {event.description}
                        </Typography>
                      </CardContent>

                    </div>
                  </CardActionArea>
                </Card>
              </GridItem>
            ))}

          </GridContainer>
        </div>
      </Parallax>
    </div >



  );
}

export default Events;
