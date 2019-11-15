import React from "react";
import Button from "../Button/Button";
import styles from "./SupportQuestion.styles";
import { withStyles } from "@material-ui/core/styles";

const SupportQuestion = ({ classes, toggleSupporting, supporting }) => {
  return (
    <div className={classes["support-container"]}>
      {supporting ? (
        <div>
          


          <Button onClick={() => toggleSupporting(false)} className={classes["cancl-btn"]}>Cancel</Button>
          <Button onClick={() => toggleSupporting(false)}>Save</Button>
        </div>
      ) : (
        <Button onClick={() => toggleSupporting(true)}>
          I was also asked this question
        </Button>
      )}
    </div>
  );
};

export default withStyles(styles)(SupportQuestion);
