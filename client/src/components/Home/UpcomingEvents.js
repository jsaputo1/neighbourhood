import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";

function UpcomingEvents(props) {
  //Grabs the neighbourhood id from the props
  const userNeighbourhoodId = props.user.neighbourhood_id;

  const [events, setEvents] = useState([]);

  //Gets all the events in the neighbourhood
  const getEventsForNeighbourhood = (id) => {
    axios.get("/events").then((response) => {
      const events = response.data;
      const eventsInNeighbourhood = events.filter(
        (event) => event.neighbourhood_id === id
      );
      setEvents(eventsInNeighbourhood.slice(0, 6));
    });
  };

  useEffect(() => {
    getEventsForNeighbourhood(userNeighbourhoodId);
  }, []);
  return (
    <div>
      {events.map((event) => (
        <Post
          user_photo={event.profile_photo}
          user_first_name={event.first_name}
          user_last_name={event.last_name}
          time_created={event.time_created}
          post_photo={event.event_photo}
          post_description={event.description}
          post_title={event.title}
          event_time={event.event_time}
          event_date={event.event_date}
          receiver={props.receiver}
          setReceiver={props.setReceiver}
          user_id={event.user_id}
        />
      ))}
    </div>
  );
}
export default UpcomingEvents;
