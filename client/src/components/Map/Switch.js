import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default function SwitchLabels() {
  const [state, setState] = React.useState({
    Neighbours: true,
    Events: true,
    Services: true,
    Alerts: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={state.checkedA}
            onChange={handleChange}
            name="Neighbours"
            color="primary"
          />
        }
        label="neighbours"
      />
      <FormControlLabel
        control={
          <Switch
            checked={state.checkedB}
            onChange={handleChange}
            name="Events"
            color="primary"
          />
        }
        label="Events"
      />
      <FormControlLabel
        control={
          <Switch
            checked={state.checkedB}
            onChange={handleChange}
            name="Services"
            color="primary"
          />
        }
        label="Services"
      />
      <FormControlLabel
        control={
          <Switch
            checked={state.checkedB}
            onChange={handleChange}
            name="Alerts"
            color="primary"
          />
        }
        label="Alerts"
      />
    </FormGroup>
  );
}
