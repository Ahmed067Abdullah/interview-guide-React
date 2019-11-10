import React from "react";
import styles from "./Comment.styles";
import { withStyles } from "@material-ui/core/styles";
import Linkify from "react-linkify";
import componentDecorator from "../../utils/componentDecorator";
import moment from "moment";

const Comment = ({ classes, comment }) => {
  return (
    <div className={classes["comment-container"]}>
      <p className={classes["comment-text"]}>
        <span>{`${comment.postedByName}: `}</span>
        <Linkify componentDecorator={componentDecorator}>
          {comment.text}
        </Linkify>
      </p>
      <span className={classes["commented-at"]}>
        {moment(comment.postedAt).fromNow()}
      </span>
    </div>
  );
};

export default withStyles(styles)(Comment);
