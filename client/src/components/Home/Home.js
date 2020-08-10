import React from "react";
import AlertsCarousel from "./AlertsCarousel";
import UpcomingEvents from "./UpcomingEvents";
import "../../styles.scss";
import Box from "./Box";

function Home(props) {
  return (
    <div>
      <div className="carousel-container">
        <AlertsCarousel user={props.user} />
      </div>
      <div className="container-fluid gedf-wrapper">
        <div className="row">
          <Box user={props.user} />
          <UpcomingEvents
            user={props.user}
            receiver={props.receiver}
            setReceiver={props.receiverData}
          />

          {/* <div class="col-md-3">
            <div class="card gedf-card">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" class="card-link">
                  Card link
                </a>
                <a href="#" class="card-link">
                  Another link
                </a>
              </div>
            </div>
            <div class="card gedf-card">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" class="card-link">
                  Card link
                </a>
                <a href="#" class="card-link">
                  Another link
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
