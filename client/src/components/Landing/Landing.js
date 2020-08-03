import React from "react";
import Button from "@material-ui/core/Button";

function Landing() {
  return (
    <div>
      <h1>Landing Page</h1>
      <div>
        <Button variant="contained" color="primary" href="/login">
          Login
        </Button>
        <br />
        <br />
        <Button variant="contained" color="primary" href="/register">
          Register
        </Button>
      </div>
    </div>
  );
}

export default Landing;
