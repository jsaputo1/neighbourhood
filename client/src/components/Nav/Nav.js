import React, { useState } from "react";
import "../../styles.scss";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

function Nav(props) {
  const [landingRedirect, setlandingRedirect] = useState(false);
  const logout = () => {
    axios.post("/users/logout").then((response) => {
      setlandingRedirect(true);
      props.logout({});
    });
  };

  if (landingRedirect) {
    return <Redirect to="/login" />;
  }
  return (
    <nav>
      <h3>LOGO</h3>
      <ul className="nav-links">
        <Link className="link-style" to="/home">
          <li>Home</li>
        </Link>
        <Link className="link-style" to="/events">
          <li>Events</li>
        </Link>
        <Link className="link-style" to="/services">
          <li>Services</li>
        </Link>
        <Link className="link-style" to="/Alerts">
          <li>Alerts</li>
        </Link>
        <Link className="link-style" to="/Map">
          <li>Map</li>
        </Link>
        <Link className="link-style" to="/Messages">
          <li>Messages</li>
        </Link>
        <Link className="link-style" to="/Account">
          <li>Account</li>
        </Link>
        {props.user === undefined ? (
          <Link className="link-style" to="/Login">
            <li>Login</li>
          </Link>
        ) : (
          <div>
            <li>
              <h6>
                {props.user.first_name}
                {` ${props.user.last_name}`}
              </h6>
              <img src={props.user.profile_photo} alt="" />
            </li>
            <Button variant="link" onClick={logout}>
              <li>Logout</li>
            </Button>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
