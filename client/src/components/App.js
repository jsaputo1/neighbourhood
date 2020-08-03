import React from "react";
import "../styles/App.css";
import Nav from "./Nav/Nav";
import Events from "./Events/Events";
import Services from "./Services/Services";
import Alerts from "./Alerts/Alerts";
import Map from "./Map/Map";
import Messages from "./Messages/Messages";
import Account from "./Account/Account";
import Home from "./Home/Home";
import Landing from "./Landing/Landing";
import Login from "./Landing/Login";
import Register from "./Landing/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const LandingPage = () => (
    <div>
      <Route path="/" exact component={Landing} />
    </div>
  );
  const Website = () => (
    <div classname="App">
      <Nav />
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/events" exact component={Events} />
        <Route path="/services" exact component={Services} />
        <Route path="/alerts" exact component={Alerts} />
        <Route path="/map" exact component={Map} />
        <Route path="/messages" exact component={Messages} />
        <Route path="/account" exact component={Account} />
      </Switch>
    </div>
  );
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route component={Website} />
      </Switch>
    </Router>
  );
}

export default App;
