import React from "react";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
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
  handleToggle,
}) => {
  const handleMouseDownPassword = e => e.preventDefault();

  return (
    <FormControl
      className={`${classes["default-class-text-field"]} ${
        classes["password-field"]
      } ${className}`}
      variant="outlined"
    >
      <InputLabel
        htmlFor="filled-adornment-password"
        className={error ? classes["error"] : ""}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        id={`password-input-${id}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        error={Boolean(error)}
        labelWidth={70}
        onBlur={onBlur}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleToggle}
              onMouseDown={handleMouseDownPassword}
            >
              {type === "password" ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      {error ? (
        <FormHelperText
          id="outlined-weight-helper-text"
          className={classes["error"]}
        >
          {error}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default withStyles(styles)(InputField);
