import React from "react";
import "../../styles.scss";
import { Link } from "react-router-dom";

function Nav(props) {
  return (
    <nav>
      <h3>LOGO</h3>
      <ul className="nav-links">
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
        {props.user ? (
          <div>
            <li>
              <h6>{props.user.first_name}</h6>
              <img src={props.user.profile_photo} alt="" />
            </li>
            <Link className="link-style" to="/Logout">
              <li>Logout</li>
            </Link>
          </div>
        ) : (
          <Link className="link-style" to="/Login">
            Login
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
