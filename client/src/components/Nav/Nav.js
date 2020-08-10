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
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const toggleUserDropdown = () => setUserDropdownOpen(prevState => !prevState);

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
        <NavLink to="/home">
          <img src="https://i.imgur.com/j6IJGS2.png" alt="logo" />
        </NavLink>
        <div className="menu-dropdown">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle>
              Menu <i class="fa fa-chevron-down"></i>
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
      <div className="middle-nav">
        <NavLink to="/home">
          <img src="https://i.imgur.com/EGdzKq0.png" alt="banner-logo" />
        </NavLink>
      </div>
      <div class="right-side-nav">
        {props.user === undefined ? (
          <Link className="link-style" to="/Login">
            Login
          </Link>
        ) : (
            <div class="right-side-nav">
              <Link className="link-style" to="/Messages">
                <i class="fa fa-comment-o fa-2x" aria-hidden="true"></i>
              </Link>
              <div className="user-info-nav">
                <img src={props.user.profile_photo} alt="profile-picture" />
                <h3>{props.user.first_name} {props.user.last_name}</h3>
              </div>
              <div className="user-dropdown">
                <Dropdown isOpen={userDropdownOpen} toggle={toggleUserDropdown} className="user-dropdown-toggle-show">
                  <DropdownToggle>
                    <i class="fa fa-chevron-down"></i>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>
                      <figure className="user-dropdown-figure">
                        <img src={props.user.profile_photo} alt="profile-picture" />
                        {props.user.first_name} {props.user.last_name}
                      </figure>
                      <DropdownItem divider />
                    </DropdownItem>
                    <NavLink to="/account">
                      <DropdownItem>Your Profile</DropdownItem>
                    </NavLink>
                    <DropdownItem><span onClick={logout}>Logout</span></DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          )}
      </div>
    </div >
  );
};

export default Nav;


