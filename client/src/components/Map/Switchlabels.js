import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default function SwitchLabels(props) {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={props.Neighbours}
            onChange={props.handleChange}
            name="Neighbours"
            color="#ebcc34"
          />
        }
        label="Neighbours"
      />
      <FormControlLabel
        control={
          <Switch
            checked={props.Events}
            onChange={props.handleChange}
            name="Events"
            color="primary"
          />
        }
        label="Events"
      />
      <FormControlLabel
        control={
          <Switch
            checked={props.Services}
            onChange={props.handleChange}
            name="Services"
            color="primary"
          />
        }
        label="Services"
      />
      <FormControlLabel
        control={
          <Switch
            checked={props.Alerts}
            onChange={props.handleChange}
            name="Alerts"
            color="primary"
          />
        }
        label="Alerts"
      />
    </FormGroup>
  );
}
