import React from "react";
import Carousel from "react-bootstrap/Carousel";
import AlertCard from "./AlertCard";
import "../../styles.scss";

function AlertsCarousel() {
  return (
    <Carousel className="items-container">
      {/* <Carousel.Item>
        <img className="d-block w-20" src="./service.svg" alt="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item> */}
      <Carousel.Item>
        <AlertCard />
      </Carousel.Item>
      <Carousel.Item>
        <AlertCard />
      </Carousel.Item>
    </Carousel>
  );
}

export default AlertsCarousel;
