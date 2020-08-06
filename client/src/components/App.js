import React from "react";
import "../styles.scss";
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
import SelectNeighbourhood from "./Landing/SelectNeighbourhood";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Imports custom hook that manages the state
import useApplicationData from "../Hooks/useApplicationData";

function App() {
  //Gets the state from useApplicationData.js
  const { state, setUser } = useApplicationData();

  //That is going to be our main app, once we log in or sign in
  const Website = () => (
    <div>
      <Nav user={state.user} logout={setUser} />
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/events" exact>
          <Events user={state.user}></Events>
        </Route>
        <Route path="/services" exact>
          <Services user={state.user}></Services>
        </Route>
        <Route path="/alerts" exact>
          <Alerts user={state.user}></Alerts>
        </Route>
        <Route path="/map" exact component={Map} />
        <Route path="/messages" exact component={Messages} />
        <Route path="/account" exact component={Account} />
      </Switch>
    </div>
  );
  return (
    <Router>
      <Switch>
        {/* These are the path were we don't want to see the navbar */}
        <Route path="/" exact component={Landing} />
        <Route path="/login" exact>
          <Login login={setUser}></Login>
        </Route>
        <Route path="/register" exact>
          <Register register={setUser}></Register>
        </Route>
        <Route path="/selectNeighbourhood" exact>
          <SelectNeighbourhood user={state.user}></SelectNeighbourhood>
        </Route>
        {/* These are the paths were we will see the navbar */}
        <Route component={Website} />
      </Switch>
    </Router>
  );
}

export default App;
