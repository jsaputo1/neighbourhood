import React from "react";
import AlertsCarousel from "./AlertsCarousel";
import Events from "./AlertsCarousel";
import "../../styles.scss";

function Home(props) {
  return (
    <main>
      <div className="carousel-container">
        <AlertsCarousel user={props.user} />
      </div>
      <div>
        <Events />
      </div>
    </main>
  );
}

export default Home;
