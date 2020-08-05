import React, { useState, useEffect } from "react";
import moment from 'moment';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Card, CardActionArea, CardHeader, CardContent, CardMedia, Typography, FormControl, InputLabel, Select } from "@material-ui/core";


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
}));

moment().format();

function Services() {

  useEffect(() => {
    fetchServices()
    fetchFilteredCategories("Services")
  }, []);

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [state, setState] = React.useState({
    search: '',
    name: 'hai',
  });

  const fetchServices = async () => {
    const data = await fetch('http://localhost:8001/services');
    const services = await data.json();
    console.log('HEY THERE', services);
    setServices(services)
  };

  const fetchFilteredCategories = async (filter) => {
    const data = await fetch('http://localhost:8001/categories');
    const categories = await data.json();
    const filtered = categories.filter(category => category.category_type === filter)
    setCategories(filtered)
  };


  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const requestOrOffer = function (bool) {
    if (bool) return (<p><i>"This is an OFFER. We can change this to an icon or colour change during styling"</i></p>)
    return (<p><i>"This is a REQUEST. We can change this to an icon or colour change during styling."</i></p>)
  };


  const filterServices = function (services, filter) {

    console.log('SERVICES', services)
    if (!filter) {
      return services;
    }
    const selected = categories.filter(category => category.name === filter)
    return services.filter(service => service.category_id === selected[0].id)
  };


  const classes = useStyles();

  return (
    <div>
      <Parallax image={require("../../assets/img/carpentry.jpeg")}>
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
            </CardActionArea>
          </Card>
          <h1>...</h1>

          <GridContainer>

            {filterServices(services, state.search).map(service => (

              <GridItem xs={12} sm={6} md={4}>
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
                          <Avatar alt={`${service.first_name} ${service.last_name}`} src={service.profile_photo} className={classes.large} />
                        }
                        title={`${service.first_name} ${service.last_name}`}
                        subheader={`Posted ${moment(service.time_created).fromNow()}`}
                      />
                      <CardContent>
                        <Typography variant="body2" color="textPrimary" component="h3">
                          {service.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {service.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {requestOrOffer(service.service_offer)}
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
    </div>
  );
}

export default Services;
