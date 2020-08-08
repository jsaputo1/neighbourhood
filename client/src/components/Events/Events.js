import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import Calendar from "./Calendar";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  Modal,
  Backdrop,
  Fade,
  FormGroup,
} from "@material-ui/core";
import { Form } from "react-bootstrap";

// core components

// import styles from "./Material-kit-components/landingPage.js";
import "../../styles.scss";

//for Material UI
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

moment().format();

function Events(props) {
  const classes = useStyles();

  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    search: "",
    selectedValue: "",
    selectedCategory: "",
  });

  const fetchFilteredCategories = async (filter) => {
    const data = await axios.get("http://localhost:8001/categories");
    const filtered = data.data.filter(
      (category) => category.category_type === filter
    );
    setCategories(filtered);
  };

  useEffect(() => {
    fetchFilteredCategories("Events");
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
      selectedCategory: e.target.value,
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

  const registerEvent = function (registrationData) {
    console.log("REEGISTAERW", registrationData);
    axios.post("/events", registrationData).then((response) => {
      setEvents(response.data);
    });
  };

  const fetchFilteredSubscriptions = async (postCategory_id) => {
    const data = await axios.get("http://localhost:8001/subscriptions");
    const filtered = data.data.filter(
      (subscription) => subscription.category_id === parseInt(postCategory_id)
    );
    const subscriber_ids = filtered.map((entry) => (entry = entry.user_id));
    const phoneData = await axios.get(
      "http://localhost:8001/users/phone-numbers"
    );
    const phoneFiltered = phoneData.data
      .filter((user) => subscriber_ids.includes(user.id))
      .map((entry) => `+${entry.phone_number}`);
    return phoneFiltered;
  };

  const sendSubscriptionSMS = async function (postCategory_id) {
    let categoryName = "";
    for (const category of categories) {
      if (category.id === parseInt(postCategory_id)) {
        categoryName = category.name;
      }
    }
    const phoneNumbers = await fetchFilteredSubscriptions(postCategory_id);
    axios.post("/twilio", { phoneNumbers, categoryName });
  };

  const onSubmitHandler = function (event) {
    event.preventDefault();
    registerEvent({
      user_id: props.user.id,
      category_id: state.selectedCategory,
      title: event.target.elements["eventTitle"].value,
      description: event.target.elements["eventDescription"].value,
      event_photo: event.target.elements["eventPhoto"].value,
      event_start: "2020-08-13 15:30:00-07",
      event_end: "2020-08-13 19:45:00-07",
    });
    sendSubscriptionSMS(state.selectedCategory);
    handleClose();
  };

  return (
    <div className="main">
      <div className="menu">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">
            Filter By Category
          </InputLabel>
          <Select
            native
            value={state.search}
            onChange={handleChange}
            label="search"
            inputProps={{
              name: "search",
              id: "outlined-age-native-simple",
            }}
          >
            <option aria-label="None" value="" />
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="modal">
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
            <div>
              <Form onSubmit={onSubmitHandler}>
                <h2 id="transition-modal-title">Post New Event</h2>
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
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Control>
                </FormGroup>

                <Form.Group controlId="eventDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="description"
                    placeholder="Description"
                    as="textarea"
                    rows="3"
                  />
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
      <div className="calender">
        <Calendar
          user={props.user}
          events={events}
          search={state.search}
          categories={categories}
          handleOpen={handleOpen}
        />
      </div>
    </div>
  );
}

export default Events;
