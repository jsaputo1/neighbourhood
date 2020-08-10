import React, { useState } from "react";
import "../../styles.scss";
import { Link, NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from "axios";
import Button from "react-bootstrap/Button";

function Nav(props) {

  const [landingRedirect, setlandingRedirect] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
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
    <div className="nav-bar">
      <div className="left-side-nav">
        <img src="logo" alt="logo" />
        <div className="dropdown">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
              Dropdown
        </DropdownToggle>
            <DropdownMenu>
              <NavLink to="/home">
                <DropdownItem>Home</DropdownItem>
              </NavLink>
              <NavLink to="/events">
                <DropdownItem>Events</DropdownItem>
              </NavLink>
              <NavLink to="/services">
                <DropdownItem>Services</DropdownItem>
              </NavLink>
              <NavLink to="/alerts">
                <DropdownItem>Alerts</DropdownItem>
              </NavLink>
              <NavLink to="/map">
                <DropdownItem>Map</DropdownItem>
              </NavLink>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div class="right-side-nav">
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
              <Link className="link-style" to="/Account">
                <li>Account</li>
              </Link>
              <Link className="link-style" to="/Messages">
                <li>Messages</li>
              </Link>
            </div>
          )}
      </div>
    </div >
  );
};

export default Nav;


