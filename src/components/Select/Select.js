import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import styles from "./Select.styles";
import { withStyles } from "@material-ui/core/styles";

const IGSelect = ({ classes, label, options, value, handleChange }) => {
  return (
    <FormControl
      variant="outlined"
      className={`${classes["default-class-select"]}`}
    >
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={handleChange}
      >
        {options.map(o => (
          <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default withStyles(styles)(IGSelect);
