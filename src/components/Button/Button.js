import React from "react";
import styles from "./Button";
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";

const IGButton = ({ classes, children, onClick, className }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      className={`${classes['default-class-button']} ${className}`}
    >
      {children}
    </Button>
  );
};

export default withStyles(styles)(IGButton);
