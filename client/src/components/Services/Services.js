import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

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
// ""../Hooks/useApplicationData"

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

  const fetchServices = async () => {
    const services = await axios.get('http://localhost:8001/services');
    setServices(services.data)
  };

  const fetchFilteredCategories = async (filter) => {
    const data = await axios.get('http://localhost:8001/categories');
    const filtered = data.data.filter(category => category.category_type === filter)
    setCategories(filtered)
  };

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    search: "",
    selectedValue: "",
    selectedCategory: "",
  });

  useEffect(() => {
    fetchServices();
    fetchFilteredCategories("Services");
  }, [services]);

  function radioChange(value) {
    setState({
      ...state,
      selectedValue: value,
    });
  }

  function categoryChange(e) {
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const onSubmitHandler = function (event) {
    event.preventDefault();
    registerService({
      title: event.target.elements["serviceTitle"].value,
      service_offer: state.selectedValue,
      category_id: state.selectedCategory,
      description: event.target.elements["serviceDescription"].value,
      user_id: props.user.id,
      service_photo: event.target.elements["servicePhoto"].value,
    });
    handleClose();
  };

  const registerService = function (registrationData) {
    console.log(registrationData);
    axios.post("/services", registrationData);
  };

  return (
    <div>
      <Parallax image={require("../../assets/img/carpentry.jpeg")}>
        <div className={classes.container}>
          <Card className={classes.root}>
            <CardActionArea>
              <p>{state.search}</p>
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

              {props.user ? (
                <div>
                  <h6>{props.user.first_name}</h6>
                  <div>
                    <button type="button" onClick={handleOpen}>
                      Post New Service Listing
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
                          <Form onSubmit={onSubmitHandler}>
                            <Form.Group controlId="serviceTitle">
                              <Form.Label>Service Title</Form.Label>
                              <Form.Control type="title" placeholder="Title" />
                            </Form.Group>

                            <Form.Group controlId="serviceRequestOrOffer">
                              <RadioGroup
                                name="requestOrOffer"
                                selectedValue={state.selectedValue}
                                onChange={radioChange}
                              >
                                <label>
                                  <Radio value={false} />
                                  Request
                                </label>
                                <label>
                                  <Radio value={true} />
                                  Offer
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
                                  <option key={category.id} value={category.id}>
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

                            <Form.Group controlId="servicePhoto">
                              <Form.Label>Photo URL</Form.Label>
                              <Form.Control type="url" placeholder="URL" />
                            </Form.Group>

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
            </CardActionArea>
          </Card>

          <h1>...</h1>

          <GridContainer>
            {filterByCategory(services, state.search, categories).map(
              (service) => (
                <GridItem xs={12} sm={6} md={3}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <div key={service.id}>
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
                      </div>
                    </CardActionArea>
                  </Card>
                </GridItem>
              )
            )}
          </GridContainer>
        </div>
      </Parallax>
    </div>
  );
}

export default Services;
