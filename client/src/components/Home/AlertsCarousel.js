import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import AlertCard from "./AlertCard";
import "../../styles.scss";
import axios from "axios";

function AlertsCarousel(props) {
  //Grab the neighbourhood id from the props
  const userNeighbourhoodId = props.user.neighbourhood_id;
  //Manages the state of the alerts
  const [alerts, setAlerts] = useState([]);
  //Gets all the alerts in the neighbourhood
  const getAlertsForNeighbourhood = (id) => {
    const cancelToken = axios.CancelToken.source();
    axios
      .get("/alerts", { cancelToken: cancelToken.token })
      .then((response) => {
        const alerts = response.data;
        const alertsInNeighbourhood = alerts.filter(
          (alert) => alert.neighbourhood_id === id
        );
        // console.log(alertsInNeighbourhood);
        setAlerts(alertsInNeighbourhood);
        return true;
      })
      .catch((error) => console.log("cancelled!"));
    return cancelToken;
  };
  useEffect(() => {
    const cancel = getAlertsForNeighbourhood(userNeighbourhoodId);

    return () => {
      cancel.cancel();
    };
  }, []);

  return (
    <Carousel className="items-container">
      {alerts.map((alert) => (
        <Carousel.Item key={alert.id}>
          <AlertCard
            user_id={alert.user_id}
            title={alert.title}
            time_created={alert.time_created}
            description={alert.description}
            photo={alert.alert_photo}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default AlertsCarousel;
