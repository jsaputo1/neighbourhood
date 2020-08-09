import React from "react";
import AlertsCarousel from "./AlertsCarousel";
import "../../styles.scss";

function Home(props) {
  return (
    <div className="carousel-container">
      <AlertsCarousel user={props.user} />
    </div>
  );
}

export default Home;
