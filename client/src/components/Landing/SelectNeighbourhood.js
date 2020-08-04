import React from "react";
import "../../styles.scss";

function SelectNeighbourhood() {
  return <div className="select-neighbourhood-container">
    <h3>Based on your location, we suggest joining one of the following neighbourhoods </h3>
    <div className="neighbourhood-choices">
      <figure>
        <img src=""></img>
        <h4>Choice 1</h4>
      </figure>
      <figure>
        <img src=""></img>
        <h4>Choice 2</h4>
      </figure>
    </div>
  </div>;

}

export default SelectNeighbourhood;
