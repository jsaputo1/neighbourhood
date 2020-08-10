import React from "react";
import AlertsCarousel from "./AlertsCarousel";
import UpcomingEvents from "./UpcomingEvents";
import "../../styles.scss";

function Home(props) {
  return (
    <div>
      <div className="carousel-container">
        <AlertsCarousel user={props.user} />
      </div>
      <h2>Upcoming Events in your neighbourhood</h2>

      <div>
        <UpcomingEvents
          user={props.user}
          receiver={props.receiver}
          setReceiver={props.receiverData}
        />
      </div>
    </div>
  );
}

export default Home;
