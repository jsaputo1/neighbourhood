import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import PopupCard from "../Map/PopupCard";
import filterByCategory from "../Helpers/filterByCategory";
import { Modal, Backdrop, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Calendar(props) {
  const classes = useStyles();
  //Grab the neighbourhood id from the props
  const userNeighbourhoodId = props.user.neighbourhood_id;
  //Manages the state of the events
  const [events, setEvents] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventUser, setSelectedEventUser] = useState(null);

  //Gets all the events in the neighbourhood
  const getFiltredEventsForNeighbourhood = (id) => {
    axios.get("/events").then((response) => {
      const events = response.data;
      const eventsInNeighbourhood = events.filter(
        (event) => event.neighbourhood_id === id
      );
      const filtredEvents = filterByCategory(
        eventsInNeighbourhood,
        props.search,
        props.categories
      );
      const formatedEvents = filtredEvents.map((event) => {
        let formattedEvent = Object.assign({}, event);
        formattedEvent.start = `${event.event_date.slice(0, 10)}T${
          event.event_time
        }`;
        return formattedEvent;
      });

      setEvents(formatedEvents);
    });
  };

  //Gets user info for selectedEvent
  const getUserForSelectedEvent = (id) => {
    axios.get("/users/profile-info").then((response) => {
      const users = response.data;
      const userForSelectedEvent = users.find((user) => user.id === id);
      console.log(userForSelectedEvent);
      setSelectedEventUser(userForSelectedEvent);
    });
  };

  useEffect(() => {
    getFiltredEventsForNeighbourhood(userNeighbourhoodId);
  }, [props.search]);

  useEffect(() => {
    if (selectedEvent) {
      getUserForSelectedEvent(selectedEvent.user_id);
    }
  }, [selectedEvent]);
  console.log(selectedEvent);

  const handleOpen = (info) => {
    const title = info.event.title;
    const event_info = info.event.extendedProps;
    const event = { ...event_info, title: title };
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
        eventDisplay="block"
        eventClick={handleOpen}
        backgroundColor="#fccf03"
        borderColor="#fccf03"
        eventColor="#fccf03"
      />
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div>
              {selectedEvent && selectedEventUser && (
                <PopupCard
                  user_photo={selectedEventUser.profile_photo}
                  user_first_name={selectedEventUser.first_name}
                  user_last_name={selectedEventUser.last_name}
                  time_created={selectedEvent.time_created}
                  post_photo={selectedEvent.event_photo}
                  post_description={selectedEvent.description}
                  post_title={selectedEvent.title}
                  event_time={selectedEvent.event_time}
                  event_date={selectedEvent.event_date}
                />
              )}
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}
