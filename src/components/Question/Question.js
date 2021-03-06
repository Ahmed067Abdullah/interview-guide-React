import React from "react";
import Linkify from "react-linkify";
import { withStyles } from "@material-ui/core/styles";
import componentDecorator from "../../utils/componentDecorator";
import styles from "./Question.styles";
import moment from "moment";

const Question = ({ classes, question, onClick }) => (
  <div className={classes["question-container"]} onClick={onClick}>
    <div className={classes["question-info"]}>
      <p className={classes["small-text"]}>
        <i className="fas fa-user-tie"></i>
        <span>
          {question.company} ({question.interviewType})
        </span>
      </p>
      <p className={classes["small-text"]}>
        <i className="fas fa-flag"></i>
        <span>{question.position}</span>
      </p>
    </div>
    <p className={classes["question"]}>
      Q. <span>{question.question}</span>
    </p>
    <div className={classes["question-info"]}>
      <p className={classes["small-text"]}>
        <i className="fas fa-user"></i>
        <span>{question.createdByName}</span>
      </p>
      <p className={classes["small-text"]}>
        <i className="fas fa-clock"></i>
        <span>
          {moment(question.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </span>
      </p>
    </div>
    <p className={classes["normal-text"]}>
      <span>Answer:</span>{" "}
      {question.answer ? question.answer : "*No Answer Provided*"}
    </p>
    {question.links ? (
      <p className={classes["normal-text"]}>
        <span>Links:</span>
        <Linkify componentDecorator={componentDecorator}>
          {question.links}
        </Linkify>
      </p>
    ) : null}
    <p className={classes["normal-text"]}>
      <span>Tags:</span>
      {question.tags}
    </p>
  </div>
);

export default withStyles(styles)(Question);
