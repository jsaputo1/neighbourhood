import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles.scss";

function SelectNeighbourhood() {

  const [neighbourhoods, setNeighbourhoods] = useState([]);

  useEffect(() => {
    axios.get("/neighbourhood/choices")
      .then(
        (response) => {
          // console.log("Data:", response.data);
          setNeighbourhoods(response.data);
        }
      );
  }, []);

  console.log("neighbourhoods:", neighbourhoods);
  // console.log("neighbourhoods 0 index:", Object.keys(neighbourhoods[0]));

  return (!neighbourhoods[0] ? null : (<div className="select-neighbourhood-container">
    <h3>Based on your location, we suggest joining one of the following neighbourhoods </h3>
    <div className="neighbourhood-choices">
      <figure>
        <img src={neighbourhoods[0].neighbourhood_photo}></img>
        <h4>{neighbourhoods[0].name}</h4>
      </figure>
      <figure>
        <img src={neighbourhoods[1].neighbourhood_photo}></img>
        <h4>{neighbourhoods[1].name}</h4>
      </figure>
    </div>
  </div>
  )
  );
}

export default SelectNeighbourhood;
