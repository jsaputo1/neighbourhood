import React, { useState, useEffect } from "react";
import moment from 'moment';
import axios from "axios";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Button, Avatar, Card, CardActionArea, CardHeader, CardContent, CardMedia, Typography, FormControl, InputLabel, Select, Modal, Backdrop, Fade, FormGroup } from "@material-ui/core";
import { Form } from "react-bootstrap";
import { Radio, RadioGroup } from 'react-radio-group';


// core components 
import GridContainer from "../Material-kit-components/GridContainer.js";
import GridItem from "../Material-kit-components/GridItem.js";
import Parallax from "../Material-kit-components/Parallax.js";

// import styles from "./Material-kit-components/landingPage.js";
import "../../styles.scss";


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


function Events() {
  const classes = useStyles();

  const fetchEvents = async () => {
    const data = await fetch('http://localhost:8001/events');
    const events = await data.json();
    setEvents(events)
  };

  const fetchFilteredCategories = async (filter) => {
    const data = await fetch('http://localhost:8001/categories');
    const categories = await data.json();
    const filtered = categories.filter(category => category.category_type === filter)
    setCategories(filtered)
  };

  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);


  return <h1>Events</h1>;
}

export default Events;
