import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  GoogleMap,
  Marker,
  Polygon,
  InfoWindow,
  withScriptjs,
  withGoogleMap,
} from "react-google-maps";
import PopupCard from "./PopupCard";
import Switchlabels from "./Switchlabels";
import mapStyles from "./mapStyles";

function Map(props) {
  //All the states are managed here
  const [neighbourhoodCoordinates, setneighbourhoodCoordinates] = useState({
    lat: 4.538901,
    lng: -5,
  });
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);

  //Grab the neighbourhood id from the props
  const userNeighbourhoodId = props.user.neighbourhood_id;

  //Finds the neighbourhood coordinates with the neighbourhood id
  const findNeighbourhoodCoordinates = (id) => {
    axios.get("/neighbourhood").then((response) => {
      const neighbourhoods = response.data;
      const userNeighbourhood = neighbourhoods.find(
        (neighbourhood) => neighbourhood.id === id
      );
      const lat = userNeighbourhood.coordinates.x;
      const lng = userNeighbourhood.coordinates.y;
      const neighbourhoodCoordinates = { lat, lng };
      setneighbourhoodCoordinates(neighbourhoodCoordinates);
    });
  };
  //Gets all the member of the neighbourhood
  const getUsersForNeighbourhood = (id) => {
    axios.get("/users/profile-info").then((response) => {
      const users = response.data;
      const usersInNeighbourhood = users.filter(
        (user) => user.neighbourhood_id === id
      );
      // console.log(usersInNeighbourhood);
      setUsers(usersInNeighbourhood);
    });
  };
  //Gets all the events in the neighbourhood
  const getEventsForNeighbourhood = (id) => {
    axios.get("/events").then((response) => {
      const events = response.data;
      const eventsInNeighbourhood = events.filter(
        (event) => event.neighbourhood_id === id
      );
      // console.log(eventsInNeighbourhood);
      setEvents(eventsInNeighbourhood);
    });
  };
  //Gets all the services in teh neighbourhood
  const getServicesForNeighbourhood = (id) => {
    axios.get("/services").then((response) => {
      const services = response.data;
      const servicesInNeighbourhood = services.filter(
        (service) => service.neighbourhood_id === id
      );
      // console.log(servicesInNeighbourhood);
      setServices(servicesInNeighbourhood);
    });
  };
  //Gets all the alerts in the neighbourhood
  const getAlertsForNeighbourhood = (id) => {
    axios.get("/alerts").then((response) => {
      const alerts = response.data;
      const alertsInNeighbourhood = alerts.filter(
        (alert) => alert.neighbourhood_id === id
      );
      console.log(alertsInNeighbourhood);
      setAlerts(alertsInNeighbourhood);
    });
  };

  useEffect(() => {
    findNeighbourhoodCoordinates(userNeighbourhoodId);
    getUsersForNeighbourhood(userNeighbourhoodId);
    getEventsForNeighbourhood(userNeighbourhoodId);
    getServicesForNeighbourhood(userNeighbourhoodId);
    getAlertsForNeighbourhood(userNeighbourhoodId);
  }, []);

  // Setting the coordinates of the polygon of the neighbourhood
  const squareCoords = [
    { lat: 45.535136, lng: -73.645706 },
    { lat: 45.531201, lng: -73.621651 },
    { lat: 45.539525, lng: -73.61369 },
    { lat: 45.546319, lng: -73.637601 },
  ];

  return (
    <GoogleMap
      defaultZoom={15.5}
      center={neighbourhoodCoordinates}
      defaultOptions={{ styles: mapStyles, disableDefaultUI: true }}
    >
      <Polygon
        paths={squareCoords}
        strokeColor="#FFD700"
        strokeOpacity={0.8}
        strokeWeight={2}
        fillColor="#FFFFFF"
        fillOpacity={0.35}
      />
      {props.ServicesSwitch &&
        services.map((service) => (
          <Marker
            key={service.id}
            position={{
              lat: service.coordinates.x,
              lng: service.coordinates.y,
            }}
            onClick={() => {
              setSelectedPin(service);
            }}
            icon={{
              url: "/service.svg",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}
      {props.EventsSwitch &&
        events.map((event) => (
          <Marker
            key={event.id}
            position={{
              lat: event.coordinates.x,
              lng: event.coordinates.y,
            }}
            onClick={() => {
              setSelectedPin(event);
            }}
            icon={{
              url: "/event.svg",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}
      {props.NeighboursSwitch &&
        users.map((user) => (
          <Marker
            key={user.id}
            position={{
              lat: user.coordinates.x,
              lng: user.coordinates.y,
            }}
            onClick={() => {
              setSelectedPin(user);
            }}
            icon={{
              url: "/neighbour.svg",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}
      {props.AlertsSwitch &&
        alerts.map((alert) => (
          <Marker
            key={alert.id}
            position={{
              lat: alert.coordinates.x,
              lng: alert.coordinates.y,
            }}
            onClick={() => {
              setSelectedPin(alert);
            }}
            icon={{
              url: "/alert.svg",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}
      {selectedPin && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPin(null);
          }}
          position={{
            lat: selectedPin.coordinates.x,
            lng: selectedPin.coordinates.y,
          }}
        >
          <PopupCard
            // user_photo={}
            // user_first_name
            // user_last_name
            time_created={selectedPin.time_created}
            post_photo={selectedPin.photo}
            post_description={selectedPin.description}
            post_title={selectedPin.title}
          />
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

function MapPage(props) {
  //Manages the state of the switches
  const [state, setState] = useState({
    Neighbours: false,
    Events: false,
    Services: false,
    Alerts: false,
  });

  //Set the value of the switches
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const WrappedMap = withScriptjs(withGoogleMap(Map));
  return (
    <div>
      <Switchlabels
        handleChange={handleChange}
        NeighboursSwitch={state.Neighbours}
        EventsSwitch={state.Events}
        ServicesSwitch={state.Services}
        AlertsSwitch={state.Alerts}
      />
      <div style={{ width: "100vw", height: "78vh" }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          user={props.user}
          NeighboursSwitch={state.Neighbours}
          EventsSwitch={state.Events}
          ServicesSwitch={state.Services}
          AlertsSwitch={state.Alerts}
        />
      </div>
    </div>
  );
}

export default MapPage;
