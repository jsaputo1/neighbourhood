import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import ServicePost from "./ServicePost";
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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
import { Radio, RadioGroup } from "react-radio-group";

// core components
import GridContainer from "../Material-kit-components/GridContainer.js";
import GridItem from "../Material-kit-components/GridItem.js";
import Parallax from "../Material-kit-components/Parallax.js";

// import styles from "./Material-kit-components/landingPage.js";
import "../../styles.scss";

import filterByCategory from "../Helpers/filterByCategory";
import filterByNeighbourhood from "../Helpers/filterByNeighbourhood";
// ""../Hooks/useApplicationData"

//for Material UI
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

moment().format();

function Services(props) {
  const classes = useStyles();

  console.log("HELOA SOJUFHADSOFASNFA", props);
  console.log("HELLO MOM", props.receiver, props.receiverData);

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [state, setState] = useState({
    search: "",
    serviceOffer: "",
    selectedCategory: "",
  });

  const fetchServices = async () => {
    const services = await axios.get("http://localhost:8001/services");
    setServices(
      filterByNeighbourhood(services.data, props.user.neighbourhood_id)
    );
  };

  const fetchFilteredCategories = async (filter) => {
    const data = await axios.get("http://localhost:8001/categories");
    const filtered = data.data.filter(
      (category) => category.category_type === filter
    );
    setCategories(filtered);
  };
  const filterAndSetCategories = (filter) => {
    const filtered = props.categories.filter(
      (category) => category.category_type === filter
    );
    setCategories(filtered);
  };

  useEffect(() => {
    fetchServices();
    filterAndSetCategories("Services");
  }, []);

  //////////////////// REFACTOR THESE TOGETHER IF YOU CAN
  function radioChange(value) {
    setState({
      ...state,
      serviceOffer: value,
    });
  }

  function categoryChange(e) {
    console.log(e.target.value);
    setState({
      ...state,
      selectedCategory: e.target.value,
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  ////////////////////////////

  // these functions handle the Modal
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const requestOrOffer = function (bool) {
    if (bool)
      return (
        <span>
          <i>
            "This is an OFFER. We can change this to an icon or colour change
            during styling"
          </i>
        </span>
      );
    return (
      <span>
        <i>
          "This is a REQUEST. We can change this to an icon or colour change
          during styling."
        </i>
      </span>
    );
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
      .filter(
        (user) =>
          subscriber_ids.includes(user.id) &&
          user.neighbourhood_id === props.user.neighbourhood_id
      )
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

  const registerService = function (registrationData) {
    console.log(registrationData);
    axios.post("/services", registrationData).then((response) => {
      setServices(
        filterByNeighbourhood(response.data, props.user.neighbourhood_id)
      );
    });
  };

  const onSubmitHandler = function (event) {
    event.preventDefault();
    const streetNumber = event.target.elements["streetNumber"].value;
    const streetName = event.target.elements["streetName"].value;
    const city = event.target.elements["city"].value;
    const title = event.target.elements["serviceTitle"].value;
    const description = event.target.elements["serviceDescription"].value;
    const service_photo = event.target.elements["servicePhoto"].value;
    //Gets the coordinates for the address entered by the user and save info to database
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${streetNumber}+${streetName}+${city}+CA&key=${process.env.REACT_APP_GEOCODING_KEY}`
      )
      .then((response) => {
        const coordinates = response.data.results[0].geometry.location;
        const formattedCoordinates = `(${coordinates.lat}, ${coordinates.lng})`;
        registerService({
          user_id: props.user.id,
          category_id: state.selectedCategory,
          neighbourhood_id: props.user.neighbourhood_id,
          service_offer: state.serviceOffer,
          title: title,
          coordinates: formattedCoordinates,
          description: description,
          service_photo: service_photo,
        });
        sendSubscriptionSMS(state.selectedCategory);
        handleClose();
      });
  };

  const deleteSubmitHandler = function (event) {
    event.preventDefault();
    const serviceID = parseInt(event.target.dataset.message);
    deleteService({
      user_id: props.user.id,
      service_id: serviceID,
    });
    handleCloseDelete();
  };

  const deleteService = function (registrationData) {
    axios.delete("/services/delete", { data: registrationData }).then(() => {
      fetchServices();
    });
  };

  const setReceiver = function (data) {
    props.receiverData(data);
  };

  return (
    <div id="wrapper">
      <div className="container-fluid gedf-wrapper">
        <div class="row" className="postingRow">
          <div className="col-md-6 gedf-main">
            {/* <Parallax image={require("../../assets/img/carpentry.jpeg")}> */}
            {/* <div className={classes.container}> */}
            <Card className={classes.root}>
              {/* <CardActionArea> */}
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                  htmlFor="outlined-age-native-simple"
                  id="z-index-zero"
                >
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

              {props.user ? (
                <div>
                  <div>
                    <Button color="primary" type="button" onClick={handleOpen}>
                      Post New Service Listing
                    </Button>
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
                          <Form
                            onSubmit={onSubmitHandler}
                            className="form-contenant"
                          >
                            <div className="event-form">
                              <div className="first-section">
                                <h2 id="transition-modal-title">
                                  Post New Service
                                </h2>
                                <Form.Group controlId="serviceTitle">
                                  <Form.Label>Service Title</Form.Label>
                                  <Form.Control
                                    type="title"
                                    placeholder="Title"
                                  />
                                </Form.Group>
                                <Form.Group controlId="serviceRequestOrOffer">
                                  <RadioGroup
                                    name="requestOrOffer"
                                    selectedValue={state.serviceOffer}
                                    onChange={radioChange}
                                  >
                                    <label>
                                      <Radio value={false} />
                                      <span> Request</span>
                                    </label>

                                    <label className="offer">
                                      <Radio value={true} />
                                      <span> Offer</span>
                                    </label>
                                  </RadioGroup>
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
                                      <option
                                        key={category.id}
                                        value={category.id}
                                      >
                                        {category.name}
                                      </option>
                                    ))}
                                  </Form.Control>
                                </FormGroup>

                                <Form.Group controlId="serviceDescription">
                                  <Form.Label>Description</Form.Label>
                                  <Form.Control
                                    type="description"
                                    placeholder="Description"
                                    as="textarea"
                                    rows="3"
                                  />
                                </Form.Group>
                              </div>
                              <div className="second-section">
                                <Form.Group
                                  controlId="servicePhoto"
                                  className="address"
                                >
                                  <Form.Label>Photo URL</Form.Label>
                                  <Form.Control type="url" placeholder="URL" />
                                </Form.Group>

                                <Form.Group controlId="streetNumber">
                                  <Form.Label>Address</Form.Label>
                                  <Form.Control
                                    type="streetNumber"
                                    placeholder="Street number"
                                  />
                                </Form.Group>

                                <Form.Group controlId="streetName">
                                  <Form.Control
                                    type="streetName"
                                    placeholder="Street name"
                                  />
                                </Form.Group>

                                <Form.Group controlId="city">
                                  <Form.Control
                                    type="city"
                                    placeholder="City"
                                  />
                                </Form.Group>
                              </div>
                            </div>
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
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              {/* </CardActionArea> */}
            </Card>

            <h1>...</h1>

            <div className="all-postings">
              {filterByCategory(services, state.search, categories).map(
                (service) => (
                  <ServicePost
                    key={service.id}
                    id={service.id}
                    user_photo={service.profile_photo}
                    user_first_name={service.first_name}
                    user_last_name={service.last_name}
                    time_created={service.time_created}
                    post_photo={service.service_photo}
                    post_description={service.description}
                    post_title={service.title}
                    requestOrOffer={requestOrOffer(service.service_offer)}
                    user_id={service.user_id}
                    current_user_id={props.user.id}
                    handleOpenDelete={handleOpenDelete}
                    handleCloseDelete={handleCloseDelete}
                    openDelete={openDelete}
                    deleteSubmitHandler={deleteSubmitHandler}
                    modalClass={classes.modal}
                    paperClass={classes.paper}
                    receiver={props.receiver}
                    setReceiver={props.receiverData}
                  />
                )
              )}

              {/* </div> */}
              {/* </Parallax> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;

{
  /* <div key={service.id}>
                        <CardMedia
                          className={classes.media}
                          image={service.service_photo}
                          title={service.title}
                        />

                        <CardHeader
                          avatar={
                            <Avatar
                              alt={`${service.first_name} ${service.last_name}`}
                              src={service.profile_photo}
                              className={classes.large}
                            />
                          }
                          title={`${service.first_name} ${service.last_name}`}
                          subheader={`Posted ${moment(
                            service.time_created
                          ).fromNow()}`}
                        />
                        <CardContent>
                          <Typography
                            variant="body2"
                            color="textPrimary"
                            component="h3"
                          >
                            {service.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {service.description}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {requestOrOffer(service.service_offer)}
                          </Typography>
                        </CardContent>
                      </div> */
}

{
  /* {props.user.id === service.user_id ?

                  <div>
                    <Button onClick={handleOpenDelete}>
                      DELETE Service
  </Button>
                    <Modal
                      aria-labelledby="Moo"
                      aria-describedby="Moo"
                      className={classes.modal}
                      open={openDelete}
                      onClose={handleCloseDelete}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={openDelete}>
                        <div className={classes.paper}>
                          <h2 id="transition-modal-title">Are you sure you would like to delete this Service?</h2>
                          <Form data-message={service.id} onSubmit={deleteSubmitHandler}>

                            <Button variant="contained" color="secondary" type="submit">
                              Confirm
      </Button>
                            <Button onClick={handleCloseDelete} variant="contained" color="primary" type="button">
                              Cancel
      </Button>
                          </Form>
                        </div>
                      </Fade>
                    </Modal>
                  </div>
                  :


                  <button onClick={() => setReceiver(service)}>
                    <Link to={{ pathname: '/newmessage' }}>Send Message</Link>
                  </button>


                } */
}
