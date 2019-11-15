import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import styles from './Snackbar.styles';
import { withStyles } from "@material-ui/core/styles";

const IGSnackbar = ({ classes, message, open, showSnackbar, variant }) => {
  return (
    <Snackbar
      className={classes[variant]}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={Boolean(open)}
      autoHideDuration={3000}
      onClose={() => showSnackbar(false)}
      ContentProps={{
        "aria-describedby": "message-id",
      }}
      message={<span id="message-id">{message}</span>}
    />
  );
};

export default withStyles(styles)(IGSnackbar);
