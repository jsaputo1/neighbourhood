import React from "react";
import "../../styles/Nav.css";
import { Link } from "react-router-dom";

function Nav() {
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
      </ul>
    </nav>
  );
}

export default Nav;
