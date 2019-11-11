import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import styles from "./InputField.styles";

const InputField = ({
  classes,
  type = "text",
  id = "",
  name = "",
  label = "",
  error = "",
  className = "",
  value,
  onChange,
  onBlur,
  multiline = false,
  placeholder,
  rows,
}) => {
  return (
    <TextField
      type={type}
      multiline={multiline}
      rows={rows}
      id={`text-field-${id}`}
      name={name}
      label={label}
      placeholder={placeholder}
      error={Boolean(error)}
      helperText={error}
      className={`${classes["default-class-text-field"]} ${className}`}
      value={value}
      margin="normal"
      variant="outlined"
      onBlur={onBlur}
      onChange={onChange}
    />
  );
};

export default withStyles(styles)(InputField);
