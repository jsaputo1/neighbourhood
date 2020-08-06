import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../../styles.scss";

// @material-ui/core components
import { Button } from "@material-ui/core";

function SelectNeighbourhood(props) {

  const [homeRedirect, sethomeRedirect] = useState(false);
  const [neighbourhoods, setNeighbourhoods] = useState([]);

  useEffect(() => {
    axios.get("/neighbourhood/choices")
      .then(
        (response) => {
          setNeighbourhoods(response.data);
        }
      );
  }, []);

  const onAddNeighbourhood = function (event, id) {
    event.preventDefault();
    addNeighbourhood({
      id: id,
      email: props.user.email,
    });
  };

  const addNeighbourhood = function (neighbourID) {
    axios.post("/neighbourhood/addNeighbourhood", neighbourID)
      .then(() =>
        sethomeRedirect(true)
      );
  };

  if (homeRedirect) {
    return (
      <Redirect to="/home" />);
  }

  return (!neighbourhoods[0] ? null : (<div className="select-neighbourhood-container">
    <h2>
      Hello {props.user.first_name} ! Your e-mail is {props.user.email}
    </h2>
    <h3>Based on your location, we suggest joining one of the following neighbourhoods </h3>
    <div className="neighbourhood-choices">
      {neighbourhoods.slice(0, 2).map(i => (
        <figure key={i.id}>
          <img src={i.neighbourhood_photo}></img>
          <Button variant="contained" color="primary" type="submit" onClick={(evt) => onAddNeighbourhood(evt, i.id)}>
            {i.name}
          </Button>
        </figure>
      ))}
    </div>
  </div>
  )
  );
}

export default SelectNeighbourhood;
